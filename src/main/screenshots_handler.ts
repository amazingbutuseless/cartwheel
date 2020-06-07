import * as fs from 'fs';

import { app, IpcMainEvent } from "electron";

import WebsiteScreenCapture from '../api/website_screen_capture';
import WebsiteMapGenerator from '../api/website_map_generator';

export default {
    get(e: IpcMainEvent, baseUrl: string): void {
        WebsiteMapGenerator.path = `${ app.getPath('userData') }/${ baseUrl }/sitemap.json`;

        e.returnValue = WebsiteMapGenerator.get();
    },

    list(e: IpcMainEvent, hostname: string): void {
        const basePath = `${ app.getPath('userData') }/${ hostname }`;

        if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);

        let dirs = fs.readdirSync(basePath).filter(dir => !['.DS_Store'].includes(dir));

        e.returnValue = dirs;
    },

    delete(e: IpcMainEvent, {hostname, id}): void {
        const targetPath = `${ app.getPath('userData') }/${ hostname }/${ id }`;
        fs.rmdirSync(targetPath, {
            recursive: true
        });

        e.returnValue = true;
    },

    async take(e: IpcMainEvent, { url, id, viewportWidth, remote }): void {
        const handler = new WebsiteScreenCapture(url, id, viewportWidth);
        handler.setIpcEventHandler(e, 'screenshots-take-reply');

        if (remote.length > 0) handler.remoteEnvironment = remote;

        await handler.run(url);
    },

    checkIfDifferent(e: IpcMainEvent, { hostname, id, compareTo, fileName }): void  {
        const path = `${ app.getPath('userData') }/${ hostname }/${ id }/comparison/${ compareTo }/${ fileName }`;
        e.returnValue = fs.existsSync(path);
    }
};
