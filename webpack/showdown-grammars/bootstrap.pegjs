{
  const textThemeDelimiters = {
    '(': ')',
    '|': '|',
    '[': ']',
  };
  
  let textDelimiterStack = [];
}

Content
  = output:(((!. "") { return null; }) 
  	/ (content:(NotBSMD / BSMD)+ { return content; })) 
    { 
      if (output === null) {
        return null;
      }
      
      let results = [];
      for (let o of output) {
        if (o.constructor === String) {
          results.push(o);
        } else {
          results.push({
            type: o.type,
            open: o.open,
            content: o.content.map(o => typeof o === 'string' ? o : o.outerText).join(''),
            close: o.close
          });
        }
      }
      
      return results; 
    }

BSMD
  = Card / Alert / Text
  
NotBSMD
  = content:(Escaped / !BSMD .)+ { return content.reduce((r, e) => r + (e[0] || e[1]), ''); }

Card
  = "[[" theme:Theme? tail:(CardContent / BSMD)+ "]]" {
    theme = theme || 'light';
    return {
      type: 'card',
      outerText: text(),
      open: '<div class="card card-' + theme + '"><div class="card-body">',
      content: tail,
      close: '</div></div>'
    };
  }

Alert
  = "![" theme:Theme tail:(AlertContent / BSMD)+ "]!" {
    let alertTheme = theme ? ' alert-' + theme : '';
    return {
      type: 'alert',
      outerText: text(),
      open: '<div class="alert' + alertTheme + '">',
      content: tail,
      close: '</div>'
    }
  }
  
Text
  = "(" open:[|([] &{ 
      textDelimiterStack.push(textThemeDelimiters[open]); 
      return true;
    } 
    theme:Theme? 
    tail:(TextContent / BSMD)+ 
    close:[|)\]] ")" &{ 
      if (close[0] === textDelimiterStack[textDelimiterStack.length - 1]) {
        textDelimiterStack.pop();
        return true;
      }
      
      return false;
    }
    {
      let textTheme = theme || 'muted',
        tag = { '(': 'span', '[': 'div', '|': 'p' }[open];

      if (tag === 'span') {
        // since span is an inline-element, we do not want markdown to see it as a separate string
        // just set markdown="1"
        return [
          '<' + tag + ' class="text-' + textTheme + '" markdown="1">',
          tail.map(t => t.outerText || t).join(''),
          '</' + tag + '>'
        ].join('');
      }

      return {
        type: 'text-' + tag,
        outerText: text(), // use this when outputting the content since we will recursively parse the innards of the MD
        open: '<' + tag + ' class="text-' + textTheme + '">',
        content: tail,
        close: '</' + tag + '>'
    }
  }
        
CardContent
  = content:(Escaped / !("]]" / BSMD) .)+ { return content.map(c => c[0] || c[1]).join(''); }
  
AlertContent
  = content:(Escaped / !("]!" / BSMD) .)+ { return content.map(c => c[0] || c[1]).join(''); }
    
TextContent
  = content:(Escaped 
    / !(close:[|\])] ")" &{ return close === textDelimiterStack[textDelimiterStack.length - 1]; } 
      / BSMD) 
    .)+ 
  { 
    return content.map(c => c[0] || c[1]).join(''); 
  }

Theme "string"
  = "[" theme:([A-Za-z][A-Za-z0-9\-]*) "]" { return theme[0] + theme[1].join(''); }
  
Escaped
  = "\\" char:. { return char; }