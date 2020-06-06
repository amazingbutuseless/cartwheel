import * as URL from 'url';
import * as fs from 'fs';

import { app, IpcMainEvent } from 'electron';

import * as playwright from 'playwright';

import ScreenCapture from './screen_capture';
import WebsiteCrawler from './website_crawler';
import WebsiteMapGenerator from './website_map_generator';

export default class extends ScreenCapture {
    private basePath: string;

    constructor(private url: string, private id: number, vw: number, private authenticate: object | undefined) {
        super(vw);

        const hostname = URL.parse(url).hostname;
        this.basePath = `${ app.getPath('userData') }/${ hostname }/${ id }`;
        fs.mkdirSync(this.basePath, {
            recursive: true,
        });

        WebsiteMapGenerator.path = `${ this.basePath }/sitemap.json`;
    }

    getFilePath(url: string): string {
        const requestPathname = URL.parse(url).pathname.substr(1);

        let filePath: string = requestPathname.replace(/\//g, '-');
        if (requestPathname.length < 1) filePath += 'INDEX';
        filePath += '.png';

        return filePath;
    }

    async capture(url: string, page) {
        const filePath: string = this.getFilePath(url);

        let title: string = '';
        try {
            title = await page.title();
        } catch (err) {
            console.log({url, err});
        }

        WebsiteMapGenerator.update(url, title, `${ this.basePath }/${ filePath }`);

        await super.run(page, `${ this.basePath }/${ filePath }`);
    }

    async run(ignoreHTTPSErrors: boolean = false) {
        const browser = await playwright.chromium.launch({
            ignoreHTTPSErrors
        });

        this.ipcEvent.reply(this.ipcEventChannel, {
            'message': 'It starts to take screenshots.',
        });

        const crawler = new WebsiteCrawler(browser, {
            ipcEvent: this.ipcEvent,
            ipcEventChannel: this.ipcEventChannel,
        });

        await crawler.run(this.url, this.authenticate, this.capture.bind(this));

        await browser.close();

        this.ipcEvent.reply(this.ipcEventChannel, {
            'message': 'It completes taking screenshots.',
        });
    }
};
