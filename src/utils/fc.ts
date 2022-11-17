import FC from '@alicloud/fc2';
import logger from '../common/logger';

const serviceName = 'serverless-devs-check';
const getFunctionName = (token = '') => `domain${token}`;
const TRIGGER_NAME = 'httpTrigger';

export default class Component {
  static client: any;

  static async remove(profile, regionId: string, token: string) {
    const functionName: string = getFunctionName(token);
    const client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region: regionId,
      timeout: 600 * 1000,
    });

    try {
      logger.debug('Delete trigger...');
      await client.deleteTrigger(serviceName, functionName, TRIGGER_NAME);
    } catch (ex) {
      logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }

    try {
      logger.debug('Delete function...');
      await client.deleteFunction(serviceName, functionName);
    } catch (ex) {
      logger.warn(`${ex.code}, ${ex.message}`);
    }

    // try {
    //   logger.debug('Delete service...');
    //   await client.deleteService(serviceName);
    // } catch (ex) {
    //   logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    // }
  }

  static async deploy(profile, regionId: string, token: string) {
    const functionName = getFunctionName(token);
    this.client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region: regionId,
      timeout: 600 * 1000,
    });

    await this.makeService({
      description:
        'This service is used to check the validity of accounts when domain names are delivered',
    });

    await this.makeFunction({
      functionName,
      handler: 'index.handler',
      runtime: 'nodejs14',
      environmentVariables: { token },
    });

    await this.makeTrigger({
      functionName,
      triggerName: TRIGGER_NAME,
      triggerType: 'http',
      triggerConfig: {
        AuthType: 'anonymous',
        Methods: ['POST', 'GET'],
      },
    });
  }

  static async makeService(serviceConfig) {
    logger.debug('Create service...');
    try {
      await this.client.getService(serviceName);
      logger.debug('Has service, skip create');
      return;
    } catch (ex) {
      logger.debug(`getService error message: ${ex?.toString()}`);
    }

    try {
      await this.client.createService(serviceName, serviceConfig);
    } catch (ex) {
      if (ex.code !== 'ServiceAlreadyExists') {
        logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }
    }
  }

  static async makeFunction(functionConfig) {
    logger.debug('Create function...');
    const { functionName } = functionConfig;
    // function code is `exports.handler = (req, resp, context) => resp.send(process.env.token || '');`;
    functionConfig.code = {
      zipFile: 'UEsDBAoAAAAIABULiFLOAhlFSQAAAE0AAAAIAAAAaW5kZXguanMdyMEJwCAMBdBVclNBskCxuxT9UGiJNgnFg8MX+o4Pc3R14/OQdkOpUFQ8mRQ2MtUujumJyv4PG6TFob3CjCEve78gtBaFkLYPUEsBAh4DCgAAAAgAFQuIUs4CGUVJAAAATQAAAAgAAAAAAAAAAAAAALSBAAAAAGluZGV4LmpzUEsFBgAAAAABAAEANgAAAG8AAAAAAA==',
    };
    try {
      await this.client.getFunction(serviceName, functionName);
      logger.debug('Has function, start update');
      await this.client.updateFunction(serviceName, functionConfig.functionName, functionConfig);
      return;
    } catch (ex) {
      logger.debug(`makeFunction error message: ${ex?.toString()}`);
    }

    await this.client.createFunction(serviceName, functionConfig);
    logger.debug('Created function success.');
  }

  static async makeTrigger(triggerConfig) {
    logger.debug('Create trigger...');
    const { functionName, triggerName } = triggerConfig;
    try {
      await this.client.getTrigger(serviceName, functionName, triggerName, {
        'x-fc-enable-eventbridge-trigger': 'enable',
      });

      await this.client.updateTrigger(serviceName, functionName, triggerName, triggerConfig);
      return;
    } catch (ex: any) {
      logger.debug(`makeTrigger error message: ${ex?.toString()}`);
    }

    try {
      await this.client.createTrigger(serviceName, functionName, triggerConfig);
      logger.debug('Created trigger success.');
    } catch (ex) {
      if (ex.code !== 'TriggerAlreadyExists') {
        logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }
    }
  }
}
