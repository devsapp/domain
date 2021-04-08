interface IOssClient {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    timeout?: number;
}
export default class Oss {
    static put({ region, accessKeyId, accessKeySecret, timeout, bucket }: IOssClient, filePath: any): Promise<void>;
}
export {};
