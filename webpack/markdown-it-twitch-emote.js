import { EmoteFetcher, EmoteParser } from 'twitch-emoticons';

const emoteFetcher = new EmoteFetcher(),
    scanRegex = /:([a-zA-Z]\w*?):/,
    emoteRegex = new RegExp(scanRegex, 'g');

let fetchEmotes = new Promise((resolve, reject) => {
    emoteFetcher.fetchTwitchEmotes()
        .then(() => emoteFetcher.fetchBTTVEmotes())
        .then(resolve);
        // .then(() => emoteFetcher.fetchFFZEmotes()); // currently broken
});

function create_rule(md) {
    const arrayReplaceAt = md.utils.arrayReplaceAt;

    function splitTextToken(text, level, Token) {
        const emotes = emoteFetcher.emotes;
        let token,
            lastPos = 0,
            nodes = [];
        
        text.replace(emoteRegex, function (match, name, idx, src) {
            let e = emotes.get(name);
            if (!e) {
                return;
            }
    
            if (idx > lastPos) {
                token = new Token('text', '', 0);
                token.content = text.slice(lastPos, idx);
                nodes.push(token);
            }
    
            token = new Token('twitch_emote', '', 0);
            token.markup = name;
            token.content = `<img src="${e.toLink()}" data-emote-type="${e.type}" class="twitch-emote" title="${name}" data-toggle="tooltip" />`;
            nodes.push(token);
    
            lastPos = idx + match.length;
        });
    
        if (lastPos < text.length) {
            token = new Token('text', '', 0);
            token.content = text.slice(lastPos);
            nodes.push(token);
        }
    
        return nodes;
    }

    return function twitch_emote_replace(state) {
        let blockTokens = state.tokens,
            autolinkLevel = 0;

        for (let j = 0, l = blockTokens.length; j < l; j++) {
            if (blockTokens[j].type !== 'inline') {
                continue;
            }

            let tokens = blockTokens[j].children;
            for (let i = tokens.length - 1; i >= 0; i--) {
                let token = tokens[i];

                if ((token.type === 'link_open' || token.type === 'link_close') && token.info === 'auto') {
                    autolinkLevel -= token.nesting;
                }

                if (token.type === 'text' && autolinkLevel === 0 && scanRegex.test(token.content)) {
                    blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token.content, token.level, state.Token));
                }
            }
        }
    };
}

export default new Promise(function (resolve, reject) {
    fetchEmotes.then(() => {
        resolve(md => {
            md.renderer.rules.twitch_emote = function (tokens, idx) {
                return tokens[idx].content;
            };
            md.core.ruler.push('twitch_emote', create_rule(md));
        });
    });
});