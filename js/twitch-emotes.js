// import TooltipTemplate from  '../templates/tooltip-template.ejs';
// import { fab } from './font-awesome';
// import bttvIcon from '../static/img/bttv-icon.svg';
// import ffzIcon from '../static/img/ffz-icon.svg';

// const emoteSetIcons = {
//     twitch: fab('fa-twitch'),
//     bttv: $(bttvIcon).attr('data-icon', 'bttv'),
//     ffz: $(ffzIcon).attr('data-icon', 'ffz'),
// };

// $(() => {
//     $('.twitch-emote').each(function () {
//         let $this = $(this),
//             emoteType = this.dataset.emoteType,
//             title = $('<div>').append(emoteSetIcons[emoteType]).append(this.title).html();
//         $(this).removeAttr('title');

//         $this.tooltip({
//             html: true,
//             title: title,
//             template: TooltipTemplate({ variant: emoteType })
//         });
//     });
// });
