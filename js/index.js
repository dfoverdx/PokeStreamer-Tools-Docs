import '../sass/index.scss';
import './img-modal';
import NextBtn from '../templates/next-btn.ejs';

let match = /^(\/?(?:[^\/]\/)*)index.html$/i.exec(window.location.pathname);
if (match) {
    window.history.replaceState({}, document.title, match[1]);    
}

hljs.initHighlightingOnLoad();

const hrefRegex = /([^#]*)(#.*$|$)/,
    href = hrefRegex.exec(window.location.href)[1];

$('#nav-div').find('ul').addClass('nav flex-column')
    .find('li').addClass('nav-item')
    .find('a').addClass('nav-link');

$('#nav-div a').each(function () {
    let m = hrefRegex.exec(this.href);
    if (m && m[1] === href) {
        if (m[2].length > 1) {
            this.href = m[2];
        } else {
            $(this).parent().addClass('always-active').parents('li').addClass('active-child');
        }
    }
});

$('.next-btn').replaceWith(function () {
    return NextBtn(this.dataset);
});

$('.alert a').addClass('alert-link');

// TODO: get TOC to scroll automatically