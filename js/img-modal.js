import ImgModal from '../templates/img-modal.ejs';

$('body').on('click', 'img.img-modal', function (e) {
    let $img = $(this),
        $modal = $(ImgModal({ src: this.src }));
    $('body').append($modal);
    $modal.modal('show');
    $modal.one('hidden.bs.modal', () => {
        $modal.remove();
    });
});