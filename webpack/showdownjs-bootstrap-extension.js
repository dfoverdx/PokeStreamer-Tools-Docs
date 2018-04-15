"use strict";

const showdown = require('showdown'),
    cheerio = require('./helpers/cheerio'),
    BootstrapExtension = function () {
        String.prototype.reverse = function () {
            return this.split('').reverse().join('');
        };

        const TextExtension = {
                type: 'lang',
                filter: function (text, converter) {
                    const doubleParenRegex = /\(\((?:\[([^\]]+)\])?((?:.|\r?\n)+?(?=\)\)))\)\)/g;

                    return text.replace(doubleParenRegex, function(match, theme, contents){
                        const $ = cheerio.load(converter.makeHtml(contents));
                        theme = theme || 'muted';
                        let $paras = $('p');
                        let tag = 'div';
                        if ($paras.length === 1) {
                            tag = 'span';
                            contents = $paras.html();
                        } else {
                            contents = converter.makeHtml(contents);
                        }

                        return `<${tag} class="text-${theme}">${contents}</${tag}>`;
                    });
                }
            },
            CardExtension = {
                type: 'lang',
                filter: function (text, converter) {
                    const doubleBracketRegex = new RegExp(`\\[\\[(?:\\[([^\]])\\])?((?:.|\\r?\\n)+?(?=\\]\\]))\\]\\]`, 'g');

                    return text.replace(doubleBracketRegex, function(match, style, contents){
                        style = style || 'light';
                        const $ = cheerio.load(converter.makeHtml(contents));
                        let $blocks = $('body > p, body > h1, body > h2, body > h3, body > h4, body > h5, body > h6, body > div'),
                            header = '',
                            tag = 'div';

                        if ($blocks.length === 1) {
                            tag = 'span';
                            contents = $blocks.html();
                        } else {
                            let $header = 
                                $blocks.first().filter('h1, h2, h3, h4, h5, h6').addClass('card-header').remove();

                            if ($header.length) {
                                header = $.html($header);
                                $blocks = $('body').children();
                            }

                            let cardBody = 
                                $blocks.length === 1 ? $blocks.html() : 
                                $blocks.map(function () { 
                                    return converter.makeHtml($(this).html());
                                }).get().join('');

                            let $cardBody = $('<div>').addClass('card-body').html(cardBody);
                            contents = $.html($cardBody);
                        }

                        return `<${tag} class="card bg-${style}">${header}${contents}</${tag}>`;
                    });
                }
            },
            AlertExtension = {
                type: 'lang',
                filter: function (text, converter) {
                    const alertRegex = new RegExp(`!!(?!\\\\)((?:.|\n\r?)+?)\\]([^\[]+)\\[?!!(?!\\\\)`, 'g'),
                        escapedExclamationPoint = /\\!/g;

                    return text.reverse().replace(alertRegex, function (match, contents, style) {
                        style = (style || 'light').reverse();
                        contents = contents.reverse().replace(escapedExclamationPoint, '!');
                        const $ = cheerio.load(converter.makeHtml(contents));
                        let $paras = $('p');
                        if ($paras.length === 1) {
                            contents = $paras.html();
                        } else {
                            contents = $paras.parent().html();
                        }

                        return `<div class="alert alert-${style}">${contents}</div>`.reverse();
                    }).reverse();
                }
            };

        return [TextExtension, CardExtension, AlertExtension];
    };

module.exports = BootstrapExtension;