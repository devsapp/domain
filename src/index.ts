import * as core from '@serverless-devs/core';
import _ from 'lodash';
import Base from './common/base';
import constant from './constant';
import AddFcDomain from './utils/addFcDomain';
import AddOssDomain from './utils/addOssDomain';
import AddJamstack from './utils/addJamstack';
import { IInputs, isFcToken, isOssToken } from './interface';
import logger from './common/logger';

const DOMAIN_DB = {
  name: 'domain',
  access: '',
  content: {
    domain: '',
    weight: 3,
  },
};

export default class Compoent extends Base {
  async get(inputs: IInputs) {
    const { props, credential, help } = await this.hanlderInputs(inputs, 'get');

    if (help) {
      core.help(constant.HELP);
      return;
    }
    DOMAIN_DB.access = inputs.project?.access;

    if (isFcToken(props)) {
      const domain = await AddFcDomain.domain(props, credential);
      DOMAIN_DB.content.domain = domain;
      super.__report(DOMAIN_DB);
      return domain;
    }

    if (isOssToken(props)) {
      const domain = await AddOssDomain.domain(props, credential);
      DOMAIN_DB.content.domain = domain;
      super.__report(DOMAIN_DB);
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
    DOMAIN_DB.content.domain = domain;
    DOMAIN_DB.access = inputs.project?.access;
    super.__report(DOMAIN_DB);
    return domain;
  }

  private async hanlderInputs(inputs: IInputs, _command: string) {
    logger.debug(`inputs params: ${JSON.stringify(inputs.props)}`);
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
