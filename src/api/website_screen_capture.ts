import * as URL from 'url';
import * as fs from 'fs';

import { app, IpcMainEvent } from 'electron';

import * as playwright from 'playwright';

import ScreenCapture from './screen_capture';
import WebsiteCrawler from './website_crawler';
import WebsiteMapGenerator from './website_map_generator';
import {BaseComparison, ComparisonWithPreviousScreenshot, ComparisonWithRemotePage} from "./webpage_comparison";

export default class extends ScreenCapture {
    private basePath: string;
    private comparisonerWithPreviousVersion: ComparisonWithPreviousScreenshot;
    private comparisonerWithRemoteWebSite: ComparisonWithRemotePage | null;

    constructor(private url: string, private id: number, vw: number, private authenticate: object | undefined) {
        super(vw);

        const hostname = URL.parse(url).hostname;
        this.basePath = `${ app.getPath('userData') }/${ hostname }/${ id }`;
        fs.mkdirSync(this.basePath, {
            recursive: true,
        });

        WebsiteMapGenerator.path = `${ this.basePath }/sitemap.json`;

        this.comparisonerWithPreviousVersion = new ComparisonWithPreviousScreenshot(this.basePath);
        this.comparisonerWithRemoteWebSite = null;
    }

    set remoteEnvironment(remoteUrl) {
        this.comparisonerWithRemoteWebSite = new ComparisonWithRemotePage(this.basePath, remoteUrl, this.viewport.width);
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

        const destPath = `${ this.basePath }/${ filePath }`;

        WebsiteMapGenerator.update(url, title, destPath);

        await super.run(page, destPath);

        this.comparisonerWithPreviousVersion.compare(destPath);
        if (this.comparisonerWithRemoteWebSite) {
            this.comparisonerWithRemoteWebSite.compare(destPath, url);
        }
    }

    async run(ignoreHTTPSErrors: boolean = false) {
        const browser = await playwright.chromium.launch();

        if (ignoreHTTPSErrors) await browser.newContext({ ignoreHTTPSErrors });

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
            'complete': true,
            'message': 'It completes taking screenshots.',
        });
    }
};
