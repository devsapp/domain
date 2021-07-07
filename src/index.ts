import * as core from '@serverless-devs/core';
import constant from './constant';
import AddFcDomain from './utils/addFcDomain';
import AddOssDomain from './utils/addOssDomain';
import AddJamstack from './utils/addJamstack';
import { IInputs, isFcToken, isOssToken } from './interface';
import logger from './common/logger';

export default class Compoent {
  async get(inputs: IInputs) {
    const {
      props,
      credential,
      help,
    } = await this.hanlderInputs(inputs, 'get');

    if (help) {
      core.help(constant.HELP);
      return;
    }

    if (isFcToken(props)) {
      return await AddFcDomain.domain(props, credential);
    }

    if (isOssToken(props)) {
      return await AddOssDomain.domain(props, credential);
    }

    throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
  }

  async jamstack(inputs: IInputs) {
    const {
      props,
      credential,
      help,
    } = await this.hanlderInputs(inputs, 'jamstack');

    if (help) {
      core.help(constant.JAM_STACK_HELP);
      return;
    }

    return await AddJamstack.domain(props, credential);
  }

  private async hanlderInputs(inputs: IInputs, command: string) {
    logger.setContent(constant.CONTEXT);
    logger.debug(`inputs params: ${JSON.stringify(inputs.props)}`);
    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = core.commandParse(inputs, apts);
    logger.debug(`Command data is: ${JSON.stringify(commandData)}`);

    if (commandData.data?.help) {
      core.reportComponent('domain', { uid: '', command });
      return { help: true };
    }
    const credential = inputs.credential || await core.getCredential(inputs.project.access);

    core.reportComponent('domain', {
      uid: credential.AccountID,
      command,
    });

    const { props = {} } = inputs;
    if (props?.service && /_/.test(props.service)) {
      const s = props.service.replace(/_/g, '-');
      logger.warning(`props.service has _, transfrom to ${s}`);
      props.service = s;
    }
    if (props?.function && /_/.test(props.function)) {
      const f = props.function.replace(/_/g, '-');
      logger.warning(`props.function has _, transfrom to ${f}`);
      props.function = f;
    }
    if (props?.project && /_/.test(props.project)) {
      const p = props.project.replace(/_/g, '-');
      logger.warning(`props.project has _, transfrom to ${p}`);
      props.project = p;
    }

    return {
      props,
      credential,
    };
  }
}
