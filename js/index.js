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

let $card = $('.card');
$card.each(function () {
    $(this).children('.card-body').children().first('h1, h2, h3, h4, h5, h6')
        .remove().wrap($('<div>').addClass('card-header')).parent().prependTo($(this));
});

$('.next-btn').replaceWith(function () {
    return NextBtn(this.dataset);
});

// $('body').html((_, html) => html.replace(/(?<!\\)\(\(((?:(?!(?<!\\)\)\)).)+?)(?<!\\)\)\)/g));

applyEasterEggs();
initNav();