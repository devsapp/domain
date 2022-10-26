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
  static async remove(profile, regionId: string) {
    const client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region: regionId,
      timeout: 600 * 1000,
    });

    try {
      logger.debug('Delete function...');
      await client.deleteFunction(serviceName, functionName);
    } catch (ex) {
      logger.warn(`${ex.code}, ${ex.message}`);
    }
  }

  static async deploy(profile, region: string, domain: string): Promise<boolean> {
    const client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region,
      timeout: 600 * 1000,
    });

    logger.debug('Create service...');
    try {
      await client.getService(serviceName);
      logger.debug('Has service, skip create');
    } catch (ex) {
      logger.debug(`getService error message: ${ex?.toString()}`);
      try {
        await client.createService(serviceName, { description });
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
      timeout: 600 * 5,
      description: `check domain dns.\nupdate time: ${new Date()}`,
      code: {
        zipFile: getCodeBase64(),
      },
    };

    try {
      await client.getFunction(serviceName, functionName);
      logger.debug('Has function, start update');
      await client.updateFunction(serviceName, functionName, functionConfig);
    } catch (ex) {
      logger.debug(`makeFunction error message: ${ex?.toString()}`);
      logger.debug('Created function');
      await client.createFunction(serviceName, functionConfig);
      logger.debug('Created function success.');
    }

    logger.debug(`checkout domain: ${domain}`);
    try {
      const rs = await client.invokeFunction(
        serviceName,
        functionName,
        JSON.stringify({ domain }),
        {
          'X-Fc-Log-Type': 'Tail',
          'X-Fc-Invocation-Code-Version': 'Latest',
        },
      );
      return JSON.parse(_.get(rs, 'data', '{}'))?.status;
    } catch (ex) {
      logger.error(`checkout error: ${ex.message}`);
    }
    return false;
  }
}
