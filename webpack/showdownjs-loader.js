"use strict";

// use custom loader because npm's showdown-loader uses showdown-ghost which has been deprecated in favor of showdown
var showdown = require('showdown'),
    bootstrapExtension = require('./showdownjs-bootstrap-extension');

showdown.extension('bootstrap', bootstrapExtension);

var converter = new showdown.Converter({
        extensions: ['bootstrap'],
        ghCompatibleHeaderId: true
    });

module.exports = converter.makeHtml.bind(converter);