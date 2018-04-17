// use custom loader because npm's showdown-loader uses showdown-ghost which has been deprecated in favor of showdown
import showdown from 'showdown';
import bootstrapExtension from './showdownjs-bootstrap-extension';
import { EmoteFetcher, EmoteParser } from 'twitch-emoticons';
import TwitchEmoteExtension from './showdownjs-twitch-emote-extension';

const emoteFetcher = new EmoteFetcher();

let fetcher;
function fetchEmotes() {
    if (!fetcher) {
        fetcher = emoteFetcher.fetchTwitchEmotes();
    }

    return fetcher;
}

function loader(source) {
    let callback = this.async();
    return fetchEmotes().then(() => {
        showdown.extension('bootstrap', bootstrapExtension);
        showdown.extension('twitchEmote', new TwitchEmoteExtension(emoteFetcher.emotes));
        let converter = new showdown.Converter({
            extensions: ['bootstrap', 'twitchEmote'],
            ghCompatibleHeaderId: true
        });
        callback(null, converter.makeHtml.call(converter, source));
    }).catch(err => callback(err));
}

export default loader;