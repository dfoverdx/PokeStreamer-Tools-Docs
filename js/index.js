import '../sass/index.scss';
import './img-modal';
import initNav from './nav';
import NextBtn from '../templates/next-btn.ejs';
import './twitch-emotes';
import applyEasterEggs from './easter-eggs';

let match = /^(\/?(?:[^\/]\/)*)index.html$/i.exec(window.location.pathname);
if (match) {
    window.history.replaceState({}, document.title, match[1]);    
}

hljs.initHighlightingOnLoad();

$('.next-btn').replaceWith(function () {
    return NextBtn(this.dataset);
});

$('.alert a').addClass('alert-link');

applyEasterEggs();
initNav();