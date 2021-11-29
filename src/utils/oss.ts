import OSS from 'ali-oss';
import path from 'path';
import logger from '../common/logger';
import * as core from '@serverless-devs/core';

const { fse: fs } = core;

export default class Oss {
  static async saveFile(bucket, token) {
    const savePath = path.join(process.cwd(), '.s', `${bucket}-token`);

    logger.debug(`Save file path is: ${savePath}, token is: ${token}.`);
    await fs.outputFile(savePath, token);
    return savePath;
  }

  static async put(region, bucket, credential, filePath) {
    const ossClient = new OSS({
      region: `oss-${region}`,
      bucket,
      accessKeyId: credential.AccessKeyID,
      accessKeySecret: credential.AccessKeySecret,
      stsToken: credential.SecurityToken,
      timeout: credential.timeout || 7200000,
    });

    await ossClient.put('token', filePath);

    await ossClient.putACL('token', 'public-read');
  }
}
