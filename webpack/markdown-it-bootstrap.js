import MarkdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';
import cheerio from './helpers/cheerio';

const { utils } = MarkdownIt(),
    themeRegex = /(?:\s+\[([\-\w]+)\])?/,
    headerRegex = /(?:\s+(#{1,6})\s+(?:((?:[^#]*#)*?[^#]*)(?:\s+\2)?\s*))/;

let openContainers = [],
    defaultRender;

function renderSelf(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
}

class MdItC {
    constructor(name, md, regex) {
        this.name = name;
        
        if (!regex) {
            this.regex = new RegExp(`^${name}${themeRegex.source}$`);
        } else {
            this.regex = regex;
        }

        this._md = md;
        this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);
        this.linkOpenRule = this.linkOpenRule.bind(this);
    }
    
    validate(params) {
        return params.trim().match(this.regex);
    }

    render(tokens, idx) {
        let match = tokens[idx].info.trim().match(this.regex);

        if (tokens[idx].nesting === 1) {
            openContainers.push(this.name);
            this._md.renderer.rules.link_open = this.linkOpenRule;
        } else {
            openContainers.pop();
        }

        return this.renderMatch(match, tokens, idx);
    }

    linkOpenRule(tokens, idx, options, env, self) {
        if (openContainers.length) {
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
        super('alert', md);
    }

    renderMatch(match, tokens, idx) {
        if (tokens[idx].nesting === 1) {
            let theme = match[1] || 'info';
            return `<div class="alert alert-${theme}">\n`;
        } else {
            return `</div>\n`;
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
            return `<div class="card card-${theme}">\n${headerHtml}<div class="card-body">\n`;
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