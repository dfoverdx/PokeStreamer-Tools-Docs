import TooltipTemplate from  '../templates/tooltip-template.ejs';
import faIcon from './font-awesome';

const twitchIcon = faIcon('fa-twitch');

$(() => {
    $('.twitch-emote').each(function () {
        let $this = $(this),
            title = $('<div>').append(twitchIcon).append(this.title).html();
        $(this).removeAttr('title');

        $this.tooltip({
            html: true,
            title: title,
            template: TooltipTemplate({ variant: 'twitch' })
        });
    });
});
