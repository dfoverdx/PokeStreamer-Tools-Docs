import * as fa from '../font-awesome';
import luaIcon from '../../static/img/lua-icon.svg';
import jsonIcon from '../../static/img/json-icon.svg';

export default function renderCode($) {
    const codeIcons = {
        '.language-dos': $(fa.fas('fa-terminal')[0]),
        '.language-js': $(fa.fab('fa-js-square 30')[0]),
        '.language-json': $(jsonIcon),
        '.language-jsonc': $(jsonIcon),
        '.language-lua': $(luaIcon),
    };

    let $codeLeftIcon = $('<div>').addClass('left-icon'),
        $codeWrapper = $('<div>').addClass('code-wrapper'),
        $code = $('pre > code').filter(Array.from(Object.keys(codeIcons)).join(', ')),
        $pre = $code.parent();
    
    $pre.wrap($codeWrapper);
    $code.addClass('rounded-0').each(function () {
        let $this = $(this);
        for (let [lang, $icon] of Object.entries(codeIcons)) {
            if ($this.is(lang)) {
                $this.addClass('hljs');
                $this.closest('.code-wrapper').prepend($codeLeftIcon.clone().append($icon.clone()));
                return;
            }
        }
    });

    return $('body').html();
}