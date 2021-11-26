import { getFcEndpoint } from '../utils';
import _ from 'lodash';
import Fc from '../fc';
import * as api from '../api';
import { IFCTOKEN } from '../../interface';
import logger from '../../common/logger';

export default class AddFcDomain {
  static async domain(params: IFCTOKEN, credential): Promise<string> {
    const endpoint = await getFcEndpoint();
    if (!_.isNil(endpoint)) {
      params.endpoint = endpoint;
    }
    let tokenRs: any;
    let token: string;
    await logger.task('Generated custom domain', [
      {
        title: 'Get token....',
        task: async () => {
          tokenRs = await api.token(params);
          token = tokenRs.Body.Token;
        },
      },
      {
        title: 'Deploy helper function...',
        task: async () => {
          try {
            await Fc.deploy(credential, params.region, token);
          } catch (ex) {
            throw ex;
          }
        },
      },
      {
        title: 'Get domain....',
        task: async () => {
          await api.domain({ ...params, token });
        },
      },
    ]);

    await Fc.remove(credential, params.region);
    return (
      tokenRs.Body.Domain ||
      `${params.function}.${params.service}.${params.user}.${params.region}.fc.devsapp.net`.toLocaleLowerCase()
    );
  }
}
