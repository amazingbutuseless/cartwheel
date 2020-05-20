module.exports = {
    browser: null,

    internalLinks: [],

    authCookie: null,

    updateInternalLinks(link) {
        if (!this.internalLinks.includes(link)) {
            this.internalLinks.push(link);
        }
    },

    async findLinks(frame) {
        return await frame.$$eval(`a:not([href="#"])`, links => {
            const parser = document.createElement('a');
            parser.href = location.href;

            let internalLinks = [];

            links.forEach(link => {
                if (link.href.startsWith(`${ parser.protocol }//${ parser.hostname }`)) {
                    internalLinks.push(link.href);
                }
            });

            return internalLinks;
        });
    },

    async run(url, authenticate, callback) {
        const page = await this.browser.newPage();
        page.setDefaultTimeout(60 * 3 * 1000);

        if (this.authCookie) await page.setCookie(...this.authCookie);

        await page.goto(url);

        if (typeof authenticate !== 'undefined' && authenticate.url === url) {
            delete authenticate.url;

            let authenticateTasks = [];

            const loginid = await page.$('[name="loginid"]');
            console.log({url, loginid});

            Object.entries(authenticate).forEach(([key, value]) => {
                authenticateTasks.push(page.type(`[name="${ key }"]`, value));
            });

            await Promise.all(authenticateTasks);

            await page.press('[type="submit"]');

            await page.waitForNavigation();

            this.authCookie = await page.cookies();
        }

        await callback(url, page);

        const links = await this.findLinks(page.mainFrame());

        const newlyFound = links.filter(link => !this.internalLinks.includes(link));

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
    },
};
