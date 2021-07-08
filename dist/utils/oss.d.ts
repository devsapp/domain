export default class Oss {
    static saveFile(bucket: any, token: any): Promise<string>;
    static put(region: any, bucket: any, credential: any, filePath: any): Promise<void>;
}
