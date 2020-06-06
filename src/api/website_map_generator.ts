import * as URL from 'url';
import * as fs from "fs";

import { app } from 'electron';

export default {
    path: '',

    map: {},

    get() {
        return JSON.parse(fs.readFileSync(this.path));
    },

    writeFile(): void {
        fs.writeFileSync(`${ this.path }`, JSON.stringify(this.map));
    },

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

        this.writeFile();
    }
};
