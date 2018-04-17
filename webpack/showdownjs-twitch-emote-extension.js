export default function(emotes) {
    return {
        type: 'lang',
        regex: /:([a-zA-Z]\w*?):/g,
        replace: (match, ...groups) => {
            let e = emotes.get(groups[0]);
            if (e) {
                return `<img src="${emotes.get(groups[0]).toLink()}" class="twitch-emote" title="${groups[0]}" data-toggle="tooltip" />`;
            }

            // fallback if we don't know what the emote is
            return match;
        }
    };
}