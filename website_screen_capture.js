const path = require('path');
const URL = require('url');
const fs = require('fs');

const puppeteer = require('puppeteer');

const WebsiteCrawler = require('./website_crawler');
const WebsiteMapGenerator = require('./website_map_generator');

class ScreenCapture {
    constructor(deviceType) {
        const VIEWPORT = {
            mobile: {
                width: 375,
                height: 667,
            },
            'tablet': {
                width: 768,
                height: 1024,
            },
            'desktop': {
                width: 1280,
                height: 768,
            },
        };

        this.viewport = VIEWPORT[deviceType];
    }

    async run(page, path) {
        await page.setViewport(this.viewport);

        const options = {
            fullPage: true,
        };

        if (typeof path !== undefined) {
            options['path'] = path;

        } else {
            options['encoding'] = 'base64';
        }

        await page.screenshot(options);
    }
}

module.exports = class extends ScreenCapture {
    constructor(url, authenticate, deviceType = 'desktop') {
        super(deviceType);

        const hostname = URL.parse(url).hostname;
        this.basePath = path.resolve(`${ process.cwd() }/screenshots/${ hostname }/${ deviceType }/${ Date.now() }`);
        fs.mkdirSync(this.basePath, {
            recursive: true,
        });

        this.url = url;
        this.authenticate = authenticate;
    }

    getFilePath(url) {
        const requestPathname = URL.parse(url).pathname.substr(1);

        let filePath = requestPathname.replace(/\//g, '-');
        if (requestPathname.length < 1) filePath += 'INDEX';
        filePath += '.png';

        return filePath;
    }

    async capture(url, page) {
        const filePath = this.getFilePath(url);

        let title = '';
        try {
            title = await page.title();
        } catch (err) {
            console.log({url, err});
        }

        WebsiteMapGenerator.update(url, title, filePath);

        await super.run(page, `${ this.basePath }/${ filePath }`);
    }

    async run(ignoreHTTPSErrors = false) {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors
        });

        WebsiteCrawler.browser = browser;
        await WebsiteCrawler.run(this.url, this.authenticate, this.capture.bind(this));

        fs.writeFileSync(`${ this.basePath }/sitemap.json`, JSON.stringify(WebsiteMapGenerator.map));

        await browser.close();
    }
};
