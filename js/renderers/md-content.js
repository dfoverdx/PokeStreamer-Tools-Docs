import Cheerio from 'cheerio';
import Code from './code';
import ModalImages from './modal-images';

const renderers = [
    Code,
    ModalImages
];

export default function renderMDContent(md) {
    return renderers.reduce((output, renderer) => {
        let $ = Cheerio.load(output);
        return renderer($);
    }, md);
}