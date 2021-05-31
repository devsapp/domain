import OSS from 'ali-oss';

interface IOssClient {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  timeout?: number;
  stsToken?: string;
}

export default class Oss {
  static async put(credential: IOssClient, filePath) {
    const ossClient = new OSS({
      ...credential,
      timeout: credential.timeout || 7200000,
    });

    await ossClient.put('token', filePath);

    await ossClient.putACL('token', 'public-read');
  }
}
