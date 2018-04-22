import fa from './font-awesome-config';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

fa.library.add(solid);
fa.library.add(regular);
fa.library.add(brands);

function getIcon(i, set, options = {}) {
    try {
        if (typeof i === 'string') {
            let m = /([^\s]+)((?:\s+[a-z][^\s]+)+)?(?:\s+(\d+))?/g.exec(i);
            if (m[1] && !m[1].startsWith('fa-')) {
                m[1] = `fa-${m[1]}`;
            }

            i = (m[1] || i).replace(/-[a-z]/g, m => m[1].toUpperCase());

            if (m[2]) {
                options.classes = m[2].trim().split(/\s+/);
            }

            if (m[3]) {
                options.transform = {
                    size: parseInt(m[3], 10),
                };
            }

            set = set || 'brands';

            let icon;
            switch (set) {
                case 's':
                case 'solid':
                    icon = solid[i];
                    break;
                
                case 'r':
                case 'regular':
                    icon = regular[i];
                    break;

                case 'b':
                case 'brands':
                default:
                    icon = brands[i];
                    break;
            }

            return fa.icon(icon, options).html;
        } else {
            return fa.icon(i).html;
        }
    } catch (err) {
        return i;
    }
}

function fab(i, options) {
    return getIcon(i, 'brand', options);
}

function far(i, options) {
    return getIcon(i, 'regular', options);
}

function fas(i, options) {
    return getIcon(i, 'solid', options);
}

const css = fa.dom.css;

export {
    fab,
    far,
    fas,
    css
};