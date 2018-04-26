import mdContainer from 'markdown-it-container';

let openContainers = 0,
    defaultRender,
    detailsRegex = /^details(?:\s+(.*))?$/i;

// function renderSelf(tokens, idx, options, env, self) {
//     return self.renderToken(tokens, idx, options);
// }

function validate(params) {
    return detailsRegex.test(params.trim());
}

export default function (md, options) {
    function render(tokens, idx) {
        let match = tokens[idx].info.trim().match(detailsRegex);

        if (tokens[idx].nesting === 1) {
            openContainers++;
            let summary = match[1] ? match[1].trim() : '';
            if (summary.length) {
                summary = `<summary>${summary}</summary>\n`;
            }

            return `<details>${summary}\n`;
        } else {
            openContainers--;
            return '</details>\n';
        }
    }

    md.use(mdContainer, 'details', { validate, render });
}