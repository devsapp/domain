import { spinner } from '@serverless-devs/core';
import { sleep } from '../utils';
import Fc from './fc';
import * as api from '../api';
import { IFCTOKEN } from '../../interface';

export default class AddFcDomain {
  static async domain(params: IFCTOKEN, credential): Promise<string> {
    const tokenRs = await api.token(params);

    const token: string = tokenRs.Body.Token;

    const vm = spinner('Deploy helper function.');
    try {
      await Fc.deploy(credential, params.region, token);
      await sleep(1500);
      vm.succeed('Deployed.');
    } catch (ex) {
      vm.fail('Failed to deploy helper function.');
      throw ex;
    }

    await api.domain({ ...params, token });

    await Fc.remove(credential, params.region);
    return `${params.function}.${params.service}.${params.user}.${params.region}.fc.devsapp.net`.toLocaleLowerCase();
  }
}
