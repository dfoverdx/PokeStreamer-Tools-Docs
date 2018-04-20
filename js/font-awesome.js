import fa from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

fa.library.add(brands);

export default function(i, options = {}) {
    try {
        if (typeof i === 'string') {
            let m = /([^\s]+)(?:\s+(\d+))?/g.exec(i);
            i = (m[1] || i).replace(/-[a-z]/g, m => m[1].toUpperCase());

            if (m[2]) {
                options.transform = {
                    size: parseInt(m[2], 10),
                };
            }

            return fa.icon(brands[i], options).html;
        } else {
            return fa.icon(i).html;
        }
    } catch (err) {
        return i;
    }
}