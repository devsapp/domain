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
export declare function isFcToken(args: any): args is IFCTOKEN;
