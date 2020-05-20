import { DeviceType, RequestProps } from './configuration';

import WebsiteScreenCapture from './website_screen_capture';

export default (async (props: RequestProps) => {
    const { url, authenticate, deviceType = DeviceType.desktop, ignoreHTTPSErrors = false } = props;

    const handler = new WebsiteScreenCapture(url, authenticate, deviceType);
    await handler.run(ignoreHTTPSErrors);

});
