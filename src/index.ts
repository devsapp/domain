import * as core from '@serverless-devs/core';
import _ from 'lodash';
import constant from './constant';
import AddFcDomain from './utils/addFcDomain';
import AddOssDomain from './utils/addOssDomain';
import AddJamstack from './utils/addJamstack';
import Nslookup from './utils/nslookup';
import { IInputs, isFcToken, isOssToken } from './interface';
import logger from './common/logger';

export default class Compoent {
  async get(inputs: IInputs) {
    const { props, credential, help } = await this.hanlderInputs(inputs, 'get');

    if (help) {
      core.help(constant.HELP);
      return;
    }

    if (isFcToken(props)) {
      const domain = await AddFcDomain.domain(props, credential);
      return domain;
    }

    if (isOssToken(props)) {
      const domain = await AddOssDomain.domain(props, credential);
      return domain;
    }

    throw new Error(
      'Domain configuration error, please refer to https://github.com/devsapp/domain',
    );
  }

  async jamstack(inputs: IInputs) {
    const { props, credential, help } = await this.hanlderInputs(inputs, 'jamstack');

    if (help) {
      core.help(constant.JAM_STACK_HELP);
      return;
    }
    // @ts-ignore: .
    const domain = await AddJamstack.domain(props, credential);
    return domain;
  }

  async checkCname(inputs) {
    const parsedArgs: { [key: string]: any } = core.commandParse(inputs, {
      boolean: ['help'],
      string: ['domain', 'region'],
      alias: { help: 'h' },
    });

    if (_.get(parsedArgs, 'data.help')) {
      return core.help('TODO');
    }

    const domain = _.get(parsedArgs, 'data.domain', inputs?.props?.domain);
    const regionId = _.get(parsedArgs, 'data.region', inputs?.props?.region);
    if (_.isEmpty(domain) || !_.isString(domain)) {
      throw new Error('Please pass into the domain');
    }
    let credential = inputs.credentials;
    if (_.isEmpty(inputs.credentials)) {
      credential = await core.getCredential(inputs?.project?.access);
    }

    // await Nslookup.remove(credential, regionId);
    return await Nslookup.deploy(credential, regionId, domain);
  }

  private async hanlderInputs(inputs: IInputs, command: string) {
    logger.debug(`inputs params, ${command}: ${JSON.stringify(inputs.props)}`);
    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = core.commandParse(inputs, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    if (commandData.data?.help) {
      return { help: true };
    }
    let credential = inputs.credentials;
    if (_.isEmpty(inputs.credentials)) {
      credential = await core.getCredential(inputs?.project?.access);
    }

    return {
      props: _.mapValues(inputs.props || {}, (value) =>
        value.toString().replace(/_/g, '-').toLocaleLowerCase()),
      credential,
    };
  }
}
