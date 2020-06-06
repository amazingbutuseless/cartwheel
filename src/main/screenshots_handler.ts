import * as fs from 'fs';

import { app, IpcMainEvent } from "electron";

export default {
    list(e: IpcMainEvent, hostname: string): string[] {
        const basePath = `${ app.getPath('userData') }/${ hostname }`;

        if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);

        e.returnValue = fs.readdirSync(basePath);
    },
};
