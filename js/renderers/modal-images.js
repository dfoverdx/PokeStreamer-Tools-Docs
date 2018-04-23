import * as fa from '../font-awesome';
import { ModalImage, ModalImages } from '../widgets/modal-images';

export default function renderModalImages($) {
    $('[data-modal-images]').replaceWith(function () {
        let {
            figureClasses,
            imgClasses,
            captionClasses
        } = $(this).data();
        
        let mi = ModalImages(
            $(this)
                .find('img')
                .map((_, img) => {
                    let $img = $(img);
                    return ModalImage($img.attr('src'), $img.attr('alt'), figureClasses, imgClasses, captionClasses);
                }).get()
        );

        return mi;
    });

    return $('body').html();
}