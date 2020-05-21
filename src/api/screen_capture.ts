import { DeviceType } from './device';
import { DeviceViewport } from "./DeviceViewport";

export default class {
    viewport: object;

    constructor(deviceType: DeviceType) {
        this.viewport = DeviceViewport[deviceType].value;
    }

    async run(page, path: string) {
        await page.setViewport(this.viewport);

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
