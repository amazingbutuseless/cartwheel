import * as fs from "fs";
import WebsiteMapGenerator from "./website_map_generator";

export default class {
    private internalLinks: string[];

    private authCookie: object[];

    constructor(private browser, private ipcHandler) {
        this.internalLinks = [];
        this.authCookie = [];
    }

    private updateInternalLinks(link: string) {
        if (!this.internalLinks.includes(link)) {
            this.internalLinks.push(link);
        }
    }

    async findLinks(frame): Promise<string[]> {
        return await frame.$$eval(`a:not([href="#"])`, links => {
            const parser: HTMLAnchorElement = document.createElement('a');
            parser.href = location.href;

            let internalLinks: string[] = [];

            links.forEach(link => {
                if (link.href.startsWith(`${ parser.protocol }//${ parser.hostname }`)) {
                    internalLinks.push(link.href);
                }
            });

            return internalLinks;
        });
    }

    async run(url: string, authenticate: object | undefined, callback: Function): Promise<string[]> {
        const page = await this.browser.newPage();
        page.setDefaultTimeout(60 * 3 * 1000);

        // Todo: 로그인 후 페이지 크롤링 기능 추가
        // if (this.authCookie) await page.setCookie(...this.authCookie);

        this.ipcHandler.ipcEvent.reply(this.ipcHandler.ipcEventChannel, {
            'message': `It is taking a screenshot of ${ url }`,
        });
        await page.goto(url);

        if (typeof authenticate !== 'undefined' && authenticate.url === url) {
            delete authenticate.url;

            await this.setAuthCookie(authenticate, page);
        }

        await callback(url, page);

        const links: string[] = await this.findLinks(page.mainFrame());

        const newlyFound: string[] = links.filter(link => !this.internalLinks.includes(link));

        if (newlyFound.length > 0) {
            const tasks = newlyFound.map(link => {
                this.updateInternalLinks(link);
                return this.run(link, authenticate, callback);
            });

            await Promise.all(tasks).then(results => {
                results.forEach(result => {
                    links.push(...result);
                });
            }).catch(err => {
                console.log(err);
            });
        }

        return links;
    }

    private async setAuthCookie(authenticate: object, page: any) {
        let authenticateTasks: Array<Promise<boolean>> = [];

        Object.entries(authenticate).forEach(([key, value]) => {
            authenticateTasks.push(page.type(`[name="${key}"]`, value));
        });

        try {
            await Promise.all(authenticateTasks);
            await page.press('[type="submit"]');
            await page.waitForNavigation();

        } catch (err) {
            console.log(err);
        }

        this.authCookie = await page.cookies();
    }
}; 
