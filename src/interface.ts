export interface IInputs {
  props: IFCTOKEN | IOSSTOKEN;
  project: {
    component: string;
    access: string;
    projectName: string;
  };
  credential?: ICredentials;
  appName: string;
  args: string;
  path: any;
}

export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IFCTOKEN {
  type: string;
  user: number;
  region: string;
  service: string;
  function: string;
}

export interface IOSSTOKEN {
  type: string;
  bucket: string;
  region: string;
}

export function isFcToken(args: any): args is IFCTOKEN {
  return args.type === 'fc' && args.service !== undefined;
}

export function isOssToken(args: any): args is IOSSTOKEN {
  return args.type === 'oss' && args.bucket !== undefined;
}
