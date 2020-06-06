import {IpcMainEvent} from "electron";

export default class {
    viewport: object;

    ipcEvent: IpcMainEvent;
    ipcEventChannel: string;

    constructor(viewportWidth: number) {
        this.viewport = {
            width: viewportWidth,
            height: 667,
        };
    }

    public setIpcEventHandler(evt: IpcMainEvent, channelName: string) {
        this.ipcEvent = evt;
        this.ipcEventChannel = channelName;
    }

    async run(page, path: string) {
        await page.setViewportSize(this.viewport);

        interface screenshotOptions {
            fullPage: boolean,
            path?: string,
            encoding?: string,
        }

        const options: screenshotOptions = {
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
