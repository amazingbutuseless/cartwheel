import { DeviceType } from "./device";

import WebsiteScreenCapture from "./website_screen_capture";

interface AuthenticateData {
  url: string;
  [propName: string]: any;
}

export interface RequestProps {
  url: string;
  authenticate?: AuthenticateData;
  deviceType?: DeviceType;
  ignoreHTTPSErrors?: boolean;
}

export default async (props: RequestProps) => {
  const {
    url,
    authenticate,
    deviceType = DeviceType.desktop,
    ignoreHTTPSErrors = false,
  } = props;

  const handler = new WebsiteScreenCapture(url, authenticate, deviceType);
  await handler.run(ignoreHTTPSErrors);
};
