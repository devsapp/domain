import { HLogger, ILogger, getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import _ from 'lodash';
import constant from './constant';
import AddFcDomain from './utils/addFcDomain';
import AddOssDomain from './utils/addOssDomain';
import { IInputs, isFcToken, isOssToken } from './interface';

export default class Compoent {
  @HLogger(constant.CONTEXT) logger: ILogger;

  async get(inputs: IInputs) {
    // @ts-ignore
    delete inputs.Credentials;
    // @ts-ignore
    delete inputs.credentials;
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(constant.HELP);
      return;
    }

    const params = inputs.props;

    const credential = await getCredential(inputs.project.access);
    reportComponent('domain', {
      uid: credential.AccountID,
      command: 'get',
    })

    if (isFcToken(params)) {
      // @ts-ignore
      return await AddFcDomain.domain(params, credential);
    }

    if (isOssToken(params)) {
      const addOssDomain = new AddOssDomain();
      // @ts-ignore
      return await addOssDomain.domain(params, credential);
    }

    throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
  }
}
