import '../sass/index.scss';
import './img-modal';

hljs.initHighlightingOnLoad();

const hrefRegex = /([^#]*)(#.*$|$)/,
    href = hrefRegex.exec(window.location.href)[1];

$('#navbar-wrapper a').each(function () {
    let m = hrefRegex.exec(this.href);
    if (m && m[1] === href) {
        if (m[2].length > 1) {
            this.href = m[2];
        } else {
            $(this).addClass('always-active');
        }
    }
});