export interface IInputs {
  props: any; // IFCTOKEN | IOSSTOKEN | IJamstack;
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
  user: string;
  region: string;
  service: string;
  function: string;
  endpoint?: string;
}

export interface IOSSTOKEN {
  type: string;
  bucket: string;
  region: string;
}

export interface IJamstack {
  type: 'jamstack-fc' | 'jamstack-oss';
  project: string;
  region: string;
  bucket?: string;
  user?: string;
  service?: string;
  function?: string;
  customDomain?: string;
}

export function isFcToken(args: any): args is IFCTOKEN {
  return args.type === 'fc' && args.service !== undefined;
}

export function isOssToken(args: any): args is IOSSTOKEN {
  return args.type === 'oss' && args.bucket !== undefined;
}
