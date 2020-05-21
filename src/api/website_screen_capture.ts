import * as path from 'path';
import * as URL from 'url';
import * as fs from 'fs';

import * as puppeteer from 'puppeteer';

import { DeviceType } from './device';
import ScreenCapture from './screen_capture';
import WebsiteCrawler from './website_crawler';
import WebsiteMapGenerator from './website_map_generator';

export default class extends ScreenCapture {
    private basePath: string;

    constructor(private url: string, private authenticate: object | undefined, deviceType: DeviceType) {
        super(deviceType);

        const hostname = URL.parse(url).hostname;
        this.basePath = path.resolve(`${ process.cwd() }/screenshots/${ hostname }/${ deviceType }/${ Date.now() }`);
        fs.mkdirSync(this.basePath, {
            recursive: true,
        });

        this.authenticate = authenticate;
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

        WebsiteMapGenerator.update(url, title, filePath);

        await super.run(page, `${ this.basePath }/${ filePath }`);
    }

    async run(ignoreHTTPSErrors: boolean = false) {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors
        });

        WebsiteCrawler.browser = browser;
        await WebsiteCrawler.run(this.url, this.authenticate, this.capture.bind(this));

        fs.writeFileSync(`${ this.basePath }/sitemap.json`, JSON.stringify(WebsiteMapGenerator.map));

        await browser.close();
    }
};
