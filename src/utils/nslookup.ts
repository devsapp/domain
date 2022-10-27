import FC from '@alicloud/fc2';
import { lodash as _ } from '@serverless-devs/core';
import path from 'path';
import fs from 'fs';
import logger from '../common/logger';

const serviceName = 'serverless-devs-check';
const description = 'This service is used to check the validity of accounts when domain names are delivered';
const functionName = 'nslookup';
const zipFileName = 'nslookup.zip';

const getCodeBase64 = () => {
  let zipFile = path.join(__dirname, '..', 'helper-function-code', zipFileName);
  if (path.basename(__dirname) === 'dist') {
    zipFile = path.join(__dirname, 'helper-function-code', zipFileName);
  }
  return fs.readFileSync(zipFile, 'base64');
};

export default class Component {
  client: any;

  constructor(profile, region: string) {
    this.client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region,
      timeout: 600 * 1000,
    });
  }

  async remove() {
    try {
      logger.debug('Delete function...');
      await this.client.deleteFunction(serviceName, functionName);
    } catch (ex) {
      logger.warn(`${ex.code}, ${ex.message}`);
    }
  }

  async init(): Promise<void> {
    logger.debug('Create service...');
    try {
      await this.client.getService(serviceName);
      logger.debug('Has service, skip create');
    } catch (ex) {
      logger.debug(`getService error message: ${ex?.toString()}`);
      try {
        await this.client.createService(serviceName, { description });
      } catch (ex: any) {
        if (ex.code !== 'ServiceAlreadyExists') {
          logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
          throw ex;
        }
      }
    }

    logger.debug('Handler function...');
    const functionConfig = {
      functionName,
      handler: 'index.handler',
      runtime: 'nodejs14',
      timeout: 30,
      description: `check domain dns.\nupdate time: ${new Date()}`,
      code: {
        zipFile: getCodeBase64(),
      },
    };

    const headers = { 'x-fc-disable-container-reuse': 'True' };

    try {
      await this.client.getFunction(serviceName, functionName);
      logger.debug('Has function, start update');
      await this.client.updateFunction(serviceName, functionName, functionConfig, headers);
    } catch (ex) {
      logger.debug(`makeFunction error message: ${ex?.toString()}`);
      logger.debug('Created function');
      await this.client.createFunction(serviceName, functionConfig, headers);
      logger.debug('Created function success.');
    }
  }

  async invoke(domain: string) {
    await this.init();

    logger.debug(`checkout domain: ${domain}`);
    // 调用一次 retry 3 次，一次间隔 3s  共 9s
    // 共尝试 30 次，大概是 270s，算上调用时间约 5min
    for (let i = 0; i < 10; i++) {
      try {
        const rs = await this.client.invokeFunction(
          serviceName,
          functionName,
          JSON.stringify({ domain, retryTimes: 5, timing: 3 }),
          {
            'X-Fc-Log-Type': 'Tail',
            'X-Fc-Invocation-Code-Version': 'Latest',
          },
        );
        logger.debug(`check custom dns rs: ${rs.data}`);
        const status = JSON.parse(_.get(rs, 'data', '{}'))?.status;
        if (status) {
          return status;
        }
      } catch (ex) {
        logger.debug(`checkout error: ${ex.message}`);
      }
    }
    return false;
  }
}
