import ImgModal from '../templates/img-modal.ejs';

$('body').on('click', 'img.img-modal', function (e) {
    if ($(winow).width() < 768) {
        return;
    }

    let $img = $(this),
        $modal = $(ImgModal({ src: this.src }));
    $('body').append($modal);
    $modal.modal('show');
    $modal.one('hidden.bs.modal', () => {
        $modal.remove();
    });
});