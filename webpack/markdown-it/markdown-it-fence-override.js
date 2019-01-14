var assign          = require('../../node_modules/markdown-it/lib/common/utils').assign;
var unescapeAll     = require('../../node_modules/markdown-it/lib/common/utils').unescapeAll;
var escapeHtml      = require('../../node_modules/markdown-it/lib/common/utils').escapeHtml;

/**
 * Adapted from from node_modules/markdown-it/lib/renderer.js
 * @param {MarkdownIt} md 
 */
export default function fence_override(md) {
    md.renderer.rules.fence = function fence(tokens, idx, options, env, slf) {
        var token = tokens[idx],
            info = token.info ? unescapeAll(token.info).trim() : '',
            langName = '',
            additionalClasses = [],
            highlighted, i, tmpAttrs, tmpToken;
      
        if (info) {
          [langName, ...additionalClasses] = info.split(/\s+/g);
        }
      
        if (options.highlight) {
          highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
        } else {
          highlighted = escapeHtml(token.content);
        }
      
        if (highlighted.indexOf('<pre') === 0) {
          return highlighted + '\n';
        }
      
        // If language exists, inject class gently, without modifying original token.
        // May be, one day we will add .clone() for token and simplify this part, but
        // now we prefer to keep things local.
        if (info) {
          i        = token.attrIndex('class');
          tmpAttrs = token.attrs ? token.attrs.slice() : [];
      
          if (i < 0) {
            tmpAttrs.push([ 'class', options.langPrefix + langName ]);
            i = 0;
          } else {
            tmpAttrs[i][1] += ' ' + options.langPrefix + langName;            
          }

          if (additionalClasses.length) {
            tmpAttrs[i][1] += ' ' + additionalClasses.join(' ');
          }
      
          // Fake token just to render attributes
          tmpToken = {
            attrs: tmpAttrs
          };
      
          return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
                + highlighted
                + '</code></pre>\n';
        }

        return  '<pre><code' + slf.renderAttrs(token) + '>'
              + highlighted
              + '</code></pre>\n';
    }
}