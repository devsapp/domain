import FC from '@alicloud/fc2';
import logger from '../common/logger';

const serviceName = 'serverless-devs-check';
const functionName = 'get-domain';
const triggerName = 'httpTrigger';

export default class Component {
  static client: any;

  static async remove(profile, regionId: string) {
    const client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region: regionId,
      timeout: 600 * 1000,
    });

    try {
      logger.debug('Delete trigger...');
      await client.deleteTrigger(serviceName, functionName, triggerName);
    } catch (ex) {
      logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }

    try {
      logger.debug('Delete function...');
      await client.deleteFunction(serviceName, functionName);
    } catch (ex) {
      logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }

    try {
      logger.debug('Delete service...');
      await client.deleteService(serviceName);
    } catch (ex) {
      logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
    }
  }

  static async deploy(profile, regionId: string, token: string) {
    this.client = new FC(profile.AccountID, {
      accessKeyID: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      region: regionId,
      timeout: 600 * 1000,
    });

    await this.makeService({});

    await this.makeFunction({
      functionName,
      handler: 'index.handler',
      runtime: 'nodejs8',
      environmentVariables: { token },
    });

    await this.makeTrigger({
      triggerName,
      triggerType: 'http',
      triggerConfig: {
        AuthType: 'anonymous',
        Methods: ['POST', 'GET'],
      },
    });
  }

  static async makeService(serviceConfig) {
    try {
      logger.debug('Create service...');
      await this.client.createService(serviceName, serviceConfig);
    } catch (ex) {
      if (ex.code !== 'ServiceAlreadyExists') {
        logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }
    }
  }

  static async makeFunction(functionConfig) {
    try {
      logger.debug('Create function...');
      await this.client.updateFunction(serviceName, functionName, functionConfig);
    } catch (ex) {
      if (ex.code === 'FunctionNotFound') {
        // function code is `exports.handler = (req, resp, context) => resp.send(process.env.token || '');`;
        const zipFile = 'UEsDBAoAAAAIABULiFLOAhlFSQAAAE0AAAAIAAAAaW5kZXguanMdyMEJwCAMBdBVclNBskCxuxT9UGiJNgnFg8MX+o4Pc3R14/OQdkOpUFQ8mRQ2MtUujumJyv4PG6TFob3CjCEve78gtBaFkLYPUEsBAh4DCgAAAAgAFQuIUs4CGUVJAAAATQAAAAgAAAAAAAAAAAAAALSBAAAAAGluZGV4LmpzUEsFBgAAAAABAAEANgAAAG8AAAAAAA==';
        functionConfig.code = { zipFile };
        await this.client.createFunction(serviceName, functionConfig);
        return;
      }
      logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
      throw ex;
    }
  }

  static async makeTrigger(triggerConfig) {
    try {
      logger.debug('Create trigger...');
      await this.client.createTrigger(serviceName, functionName, triggerConfig);
    } catch (ex) {
      if (ex.code !== 'TriggerAlreadyExists') {
        logger.debug(`ex code: ${ex.code}, ex: ${ex.message}`);
        throw ex;
      }
    }
  }
}
