// Cheerio wrapper //
const Cheerio = require('cheerio');
const $ = Cheerio.load('<div></div>');

// functions stolen from http://code.jquery.com/jquery-3.3.1.js

function isFunction( obj ) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

$.prototype.unwrap = function( selector ) {
    // return $('<div>').append($(this)).find(selector).replaceWith(function () { return $(this.children); }).end().contents();
    (selector !== undefined ? this.parent( selector ) : this.parent()).each( function() {
        $( this ).replaceWith( $(this.childNodes) );
    } );
    return this;
}

$.prototype.wrapAll = function( html ) {
    var wrap;

    if ( this[ 0 ] ) {
        if ( isFunction( html ) ) {
            html = html.call( this[ 0 ] );
        }

        // The elements to wrap the target around
        wrap = $( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

        if ( this[ 0 ].parentNode ) {
            wrap.insertBefore( this[ 0 ] );
        }

        wrap.map( function() {
            var elem = this;

            while ( elem.firstElementChild ) {
                elem = elem.firstElementChild;
            }

            return elem;
        } ).append( this );
    }

    return this;
}

module.exports = $;