import ImgModal from '../templates/img-modal.ejs';

$('body').on('click', 'figure.img-modal', function (e) {
    if ($(window).width() < 768) {
        return;
    }

    let $fig = $(this),
        img = $fig.children('img')[0],
        $cap = $fig.children('figcaption'),
        $modal = $(ImgModal({ src: img.src, caption: $cap.html() }));
    $('body').append($modal);
    $modal.modal('show');
    $modal.one('hidden.bs.modal', () => {
        $modal.remove();
    });
});