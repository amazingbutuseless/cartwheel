export enum DeviceType {
  phone,
  tablet,
  desktop,
}

interface AuthenticateData {
  url: string,
  [propName:string]: any
}

export interface RequestProps {
  url: string;
  authenticate?: AuthenticateData;
  deviceType?: DeviceType;
  ignoreHTTPSErrors?: boolean;
}

interface viewportDimension {
  width: number;
  height: number;
}

export class DeviceViewport {
  static readonly phone = new DeviceViewport(DeviceType.phone, {
    width: 375,
    height: 667,
  });

  static readonly tablet = new DeviceViewport(DeviceType.tablet, {
    width: 768,
    height: 1024,
  });

  static readonly desktop = new DeviceViewport(DeviceType.desktop, {
    width: 1280,
    height: 768,
  });

  private constructor(
    private readonly key: DeviceType,
    public readonly value: viewportDimension
  ) {}
}
