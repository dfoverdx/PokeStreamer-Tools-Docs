import mdContainer from 'markdown-it-container';
import cheerio from '../helpers/cheerio';

const themeRegex = /(?:\s+\[([\-\w]+)\])?/,
    iconRegex = /(?:\s+!(?:(?:fa)?([brs])\s+)?((?:(?:fa-)?[\w-]+)+))?/,
    headerRegex = /(?:\s+(#{1,6})\s+(?:((?:[^#]*#)*?[^#]*)(?:\s+\2)?\s*))/;

let openContainers = 0,
    defaultRender;

function renderSelf(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
}

class MdItC {
    constructor(name, md, regex) {
        this.name = name;
        
        if (!regex) {
            this.regex = new RegExp(`^${name}${themeRegex.source}\s*$`);
        } else {
            this.regex = regex;
        }

        this._md = md;
        this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);
        this.linkOpenRule = this.linkOpenRule.bind(this);
    }
    
    validate(params) {
        return this.regex.test(params.trim());
    }

    render(tokens, idx) {
        let match = tokens[idx].info.trim().match(this.regex);

        if (tokens[idx].nesting === 1) {
            openContainers++;
            this._md.renderer.rules.link_open = this.linkOpenRule;
        } else {
            openContainers--;
        }

        return this.renderMatch(match, tokens, idx);
    }

    linkOpenRule(tokens, idx, options, env, self) {
        if (openContainers > 0) {
            tokens[idx].attrPush(['class', `${this.name}-link`]);
        }

        return defaultRender(tokens, idx, options, env, self);
    }
    
    get ContainerDefinition() {
        return [mdContainer, this.name, { validate: this.validate, render: this.render }];
    }
}

class Alert extends MdItC {
    constructor(md) {
        super('alert', md, new RegExp(`^alert${themeRegex.source}${iconRegex.source}\s*$`));
    }

    renderMatch(match, tokens, idx) {
        if (tokens[idx].nesting === 1) {
            let theme = match[1] || 'info';

            let icon = '';
            if (match[3]) {
                let set = match[2] || 's'; // default to solid
                let faArgs = match[3].trim().split(/\s+/).map(a => a.startsWith('fa-') ? a : 'fa-' + a).join(' ');
                icon = `<div class="bg-${match[1]} left-icon"><%= fa${set}('${faArgs} fa-fw') %></div>`;
            }

            return [
                `<div class="alert alert-${theme}">\n`,
                icon,
                `<div>\n`
            ].join('');
        } else {
            return `</div></div>\n`;
        }
    }
}

class Card extends MdItC {
    constructor(md) {
        super('card', md);
    }

    renderMatch(match, tokens, idx) {
        if (tokens[idx].nesting === 1) {
            let theme = match[1] || 'light',
                headerHtml = '';

            // if (match[3]) {
            //     let h = match[2].length;
            //     headerHtml = `<div class="card-header"><h${h}>${match[3]}</h${h}></div>\n`;
            // }
            return `<div class="card card-${theme}"><div class="card-body">\n`;
        } else {
            return `</div>\n</div>\n`;
        }
    }
}

const BootstrapContainers = [ Alert, Card ];
const BootstrapInlines = [ /*Text*/ ];

export default function (md, options) {
    return new Promise(function (resolve, reject) {
        defaultRender = md.renderer.rules.link_open || renderSelf;
        for (let BSC of BootstrapContainers) {
            md.use(...new BSC(md).ContainerDefinition);
        }

        for (let BSI of BootstrapInlines) {
            md.use(new BSI(md));
        }
        
        resolve();
    });
}