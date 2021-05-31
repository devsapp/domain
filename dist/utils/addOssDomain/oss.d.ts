interface IOssClient {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    timeout?: number;
    stsToken?: string;
}
export default class Oss {
    static put(credential: IOssClient, filePath: any): Promise<void>;
}
export {};
