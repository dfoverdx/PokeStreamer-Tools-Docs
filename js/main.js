import '../sass/main.scss';
import './img-modal';
import initNav from './nav';
import NextBtn from '../templates/next-btn.ejs';
import './twitch-emotes';
import './code';

import applyEasterEggs from './easter-eggs';

let match = /^(\/?(?:[^\/]\/)*)index.html$/i.exec(window.location.pathname);
if (match) {
    window.history.replaceState({}, document.title, match[1]);    
}

hljs.initHighlightingOnLoad();

let $card = $('.card');
$card.each(function () {
    let $header = $(this).children('.card-body').children('h1, h2, h3, h4, h5, h6').filter(':first-child')
        .remove().wrap($('<div>').addClass('card-header')).parent().prependTo($(this));        
});

$('.alert [data-fix-links] a').addClass('alert-link');
applyEasterEggs();
initNav();