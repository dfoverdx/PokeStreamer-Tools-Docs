// import { utils } from 'markdown-it';
// const {
//     arrayReplaceAt
// } = utils;

// /**
//  * @description Splits a text token based on a regex into several separate tokens.
//  * @param {Array} tokens The current token set
//  * @param {number} idx The token being split
//  * @param {RegExp} regex The regex to apply to the token's content.  Must have named groups for all tokens except the 
//  *                       for the text before and after the match.
//  * @param {object} options Options ... TODO better description
//  * @param {object} tokenTransforms How each named group should be transformed into a token
//  * @returns {Array} The tokens the text token was split into
//  */
// export default function splitTextToken(tokens, idx, regex, options, tokenTransforms) {
//     let token = tokens[idx],
//         text = token.content,
//         lastPos = 0,
//         nodes = [];

//     options = Object.assign({
//         unescapeBackslashesInTextNodes: true,
//         combineConsecutiveTextNodes: true,
//     }, options);

//     if (token.type !== 'text') {
//         throw new Error(`Token is not a text token.\n${JSON.stringify(token)}`);
//     }

//     text.replace(regex, function (match, ...args) {
//         args.reverse();
//         let [
//             groups, // named groups
//             src,
//             idx
//         ] = args;

//         // even if inner groups are 
//         console.assert(groupCallbacks.length === groups.length);

//         if (idx > lastPos) {
//             token = 
//         }
//     });

//     return nodes;
// }