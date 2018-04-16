import fs from 'fs';
import path from 'path';
import pegjs from 'pegjs';
import showdown from 'showdown';
import cheerio from './helpers/cheerio';

function collapseStrings(result, next) {
    if (typeof next === 'string' && result.length && typeof result[result.length - 1] === 'string') {
        result[result.length - 1] += next;
    } else {
        result.push(next);
    }

    return result;
}

const bsmdGrammar = fs.readFileSync(path.join(__dirname, './showdown-grammars/bootstrap.pegjs')).toString(),
bsmd = pegjs.generate(bsmdGrammar),
    BootstrapExtension = {
        type: 'lang',
        filter: function (text, converter, options) {
            let parsed = bsmd.parse(text).reduce(collapseStrings, []),
                transformed = [];

            if (parsed.length === 1 && parsed[0].constructor === String) {
                return parsed[0];
            }

            for (let v of parsed) {
                if (v.constructor === String) {
                    transformed.push(converter.makeHtml(v));
                } else {
                    let converted = converter.makeHtml(v.content),
                        $converted = cheerio.load(converted)('body');

                    if ($converted.children().length === 1) {
                        converted = $converted.children().html();
                    }

                    let t = [v.open, converted, v.close].join('');

                    if (v.type === 'card') {
                        let $ = cheerio.load(t),
                            $cardBody = $('.card-body'),
                            $header = $cardBody.children('h1, h2, h3, h4, h5, h6').filter(':first-child').remove();
                        
                        $header.insertBefore($cardBody).wrap('<div class="card-header">');
                        t = $('body').html();
                    }

                    transformed.push(t);
                }
            }
            
            return transformed.join('');
        }
    };

module.exports = BootstrapExtension;