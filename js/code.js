import * as fa from './font-awesome';
import luaIcon from '../static/img/lua-icon.svg';
import jsonIcon from '../static/img/json-icon.svg';

$(() => {
    let codeIcons = {
        '.language-dos': $(fa.fas('fa-terminal')[0]),
        '.javascript': $(jsonIcon),
        '.language-lua': $(luaIcon),
    };

    let $codeLeftIcon = $('<div>').addClass('left-icon'),
        $codeWrapper = $('<div>').addClass('code-wrapper'),
        $code = $('pre > code.hljs').filter(Array.from(Object.keys(codeIcons)).join(', ')),
        $pre = $code.parent();

    $pre.wrap($codeWrapper).parent();
    $code.addClass('rounded-0').each(function () {
        let $this = $(this);
        for (let [lang, $icon] of Object.entries(codeIcons)) {
            if ($this.is(lang)) {
                $this.closest('.code-wrapper').prepend($codeLeftIcon.clone().append($icon.clone()));
                return;
            }
        }
    });
});