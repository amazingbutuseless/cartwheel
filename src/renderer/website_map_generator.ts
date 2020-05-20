import * as URL from 'url';

export default {
    map: {},

    update(url: string, title: string, screenshot: string) {
        let depths = URL.parse(url).pathname.substr(1).split('/');

        let target: object = Object.assign(this.map, {});

        for (let i = 0; i < depths.length; i++) {
            const depth = depths[i];

            if (!target.hasOwnProperty(depth)) target[depth] = {};

            if (i === depths.length - 1) {
                target[depth] = {
                    title,
                    screenshot,
                };
            }

            target = target[depth];
        }
    }
};
