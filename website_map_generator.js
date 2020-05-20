const URL = require('url');

module.exports = {
    map: {},

    update(url, title, screenshot) {
        let depths = URL.parse(url).pathname.substr(1).split('/');

        let target = Object.assign(this.map, {});

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
