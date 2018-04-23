import ModalImagesTemplate from '../../templates/widgets/modal-images.ejs';

export function ModalImage(src, caption, figureClasses, imgClasses, captionClasses) {
    return {
        src,
        caption,
        classes: {
            figure: figureClasses || '',
            img: imgClasses || '',
            caption: captionClasses || ''
        }
    };
}

export function ModalImages(images) {
    return ModalImagesTemplate({ images });
}