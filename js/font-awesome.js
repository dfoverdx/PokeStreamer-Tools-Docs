import fa from './font-awesome-config';
import faCode from '@fortawesome/fontawesome-free-solid/faCode';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import faExclamation from '@fortawesome/fontawesome-free-solid/faExclamation';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import faInfo from '@fortawesome/fontawesome-free-solid/faInfo';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';
import faTerminal from '@fortawesome/fontawesome-free-solid/faTerminal';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faTimesCircle from '@fortawesome/fontawesome-free-regular/faTimesCircle';
import faJsSquare from '@fortawesome/fontawesome-free-brands/faJsSquare';
import faDiscord from '@fortawesome/fontawesome-free-brands/faDiscord';
import faTwitch from '@fortawesome/fontawesome-free-brands/faTwitch';
import faGithubSquare from '@fortawesome/fontawesome-free-brands/faGithubSquare';
import faWindows from '@fortawesome/fontawesome-free-brands/faWindows';
import faPayPal from '@fortawesome/fontawesome-free-brands/faPaypal';

fa.library.add(faCode, faCog, faTimes, faPlus, faTerminal, faStar, faInfo, faExclamation, faExclamationTriangle, faQuestion);
fa.library.add(faTimesCircle);
fa.library.add(faJsSquare, faDiscord, faTwitch, faGithubSquare, faWindows, faPayPal);

function getIcon(i, set, options = {}) {
    try {
        let m = /(?:fa-)?([^\s]+)((?:\s+[a-z][^\s]+)+)?(?:\s+(\d+))?/g.exec(i),
            icon = { iconName: m[1] };

        if (m[2]) {
            options.classes = m[2].trim().split(/\s+/);
        }

        if (m[3]) {
            options.transform = {
                size: parseInt(m[3], 10),
            };
        }

        set = set || 'b';

        switch (set) {
            case 's':
            case 'solid':
                icon.prefix = 'fas';
                break;
            
            case 'r':
            case 'regular':
                icon.prefix = 'far';
                break;

            case 'b':
            case 'brands':
            default:
                icon.prefix = 'fab';
                break;
        }

        return fa.icon(icon, options).html;
    } catch (err) {
        return err;
    }
}

function fab(i, options) {
    return getIcon(i, 'b', options);
}

function far(i, options) {
    return getIcon(i, 'r', options);
}

function fas(i, options) {
    return getIcon(i, 's', options);
}

export {
    fab,
    far,
    fas,
};

export const css = fa.dom.css();