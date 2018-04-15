// import '../resources/js/highlight.pack';
import '../sass/index.scss';
import './img-modal';

hljs.initHighlightingOnLoad();

const hrefRegex = /([^#]*)(#.*$|$)/,
    href = hrefRegex.exec(window.location.href)[1];

$('#navbar-wrapper').find('ul').addClass('nav flex-column')
    .find('li').addClass('nav-item')
    .find('a').addClass('nav-link');

$('#navbar-wrapper a').each(function () {
    let m = hrefRegex.exec(this.href);
    if (m && m[1] === href) {
        if (m[2].length > 1) {
            this.href = m[2];
        } else {
            $(this).parent().addClass('always-active').parents('li').addClass('active-child');
        }
    }
});