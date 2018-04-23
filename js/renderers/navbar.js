import Cheerio from 'cheerio';
import * as fa from '../font-awesome';
import Navbar from '../../templates/navbar.ejs';

export default function renderNav(filePath) {
    let $ = Cheerio.load(Navbar(fa)),
        $navDiv = $('#nav-div');

    $navDiv.find('ul').addClass('nav flex-column')
        .find('li').addClass('nav-item')
        .find('a').addClass('nav-link');

    const hrefRegex = /\.?([^#]*)(#.*$|$)/,
        href = hrefRegex.exec(filePath)[1];

    $navDiv.find('a').each(function () {
        let $this = $(this),
            m = hrefRegex.exec($this.attr('href'));

        if (m && m[1] === href) {
            if (m[2].length > 1) {
                $this.attr('href', m[2]);
            } else {
                $this.parent().addClass('always-active').parents('li').addClass('active-child');
            }
        }
    });

    return $('body').html();
}