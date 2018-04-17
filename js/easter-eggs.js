export default function () {
    $('[data-easter-egg-text]').each(function () {
        if (Math.random() < 1 / 20) {
            let $this = $(this);
            $this.text($this.attr('data-easter-egg-text'));
        }
    });
}