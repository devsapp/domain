export interface IInputs {
    props: IFCTOKEN | IOSSTOKEN;
    credentials: ICredentials;
    appName: string;
    args: string;
    path: any;
}
export interface ICredentials {
    Alias: string;
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
export declare function isFcToken(args: any): args is IFCTOKEN;
export declare function isOssToken(args: any): args is IOSSTOKEN;
