import * as fs from 'fs';
import * as URL from 'url';

import * as playwright from 'playwright';

import ScreenCapture from './screen_capture';

const resemble = require('resemblejs');

resemble.outputSettings({
    errorColor: {
        red: 37,
        green: 183,
        blue: 209
    }
});

export class BaseComparison {
    public basePath: string;
    public dirForHostname: string;
    public destPath: string;

    readonly TOLERANT: number = 10;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.dirForHostname = basePath.substr(0, basePath.lastIndexOf('/'));
    }

    setDestDirectory(compareTo: string): void {
        const path = `${ this.basePath }/comparison/${ compareTo }`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

        this.destPath = path;
    }

    createDiffFile(fileName: string, data) {
        fs.writeFileSync(`${ this.destPath }/${ fileName }`, data.getBuffer());
    }

    compare(image1: string, image2: string | Buffer, fileName: string): void {
        resemble(image1).compareTo(image2).ignoreColors().onComplete(data => {
            if (data.rawMisMatchPercentage < this.TOLERANT) return;

            this.createDiffFile(fileName, data);
        });
    }
}

export class ComparisonWithPreviousScreenshot extends BaseComparison {
    private compareTo: string;

    constructor(basePath: string) {
        super(basePath);

        this.setDestDirectory('previous');

        this.compareTo = this.getLatestTimestamp();
    }

    getLatestTimestamp(): string {
        const timestamps = fs.readdirSync(this.basePath).filter(dir => !['.DS_Store'].includes(dir));
        if (timestamps.length < 2) return '';

        timestamps.sort((prev, next) => {
            if (prev > next) return -1;
            if (next > prev) return 1;
        });

        return timestamps[1];
    }

    compare(filePath: string): void {
        const fileName: string = filePath.substr(filePath.lastIndexOf('/') + 1);
        const compareFilePath = `${ this.dirForHostname }/${ this.compareTo }/${ fileName }`;

        if (!fs.existsSync(compareFilePath)) return;

        super.compare(filePath, compareFilePath, fileName);
    }
}

export class ComparisonWithRemotePage extends BaseComparison {
    private browser: playwright.ChromiumBrowser;

    constructor(basePath, private remoteUrl, private viewportWidth) {
        super(basePath);

        const hostname = URL.parse(remoteUrl).hostname;
        this.setDestDirectory(hostname);
    }

    async compare(filePath, url) {
        if (!this.browser) {
            this.browser = await playwright.chromium.launch();
            await this.browser.newContext({ ignoreHTTPSError: true });
        }

        const page = await this.browser.newPage();
        page.setDefaultTimeout(60 * 10 * 1000);

        await page.goto(`${ this.remoteUrl }${ URL.parse(url).path }`);

        const capture = new ScreenCapture(this.viewportWidth);
        const screenshotOfRemote = await capture.run(page);

        const fileName: string = filePath.substr(filePath.lastIndexOf('/') + 1);

        super.compare(filePath, screenshotOfRemote, fileName);
    }
}
