import * as core from '@serverless-devs/core';
import logger from '../../common/logger';
import * as api from '../api';
import { IJamstack, ICredentials } from '../../interface';
import { sleep } from '../utils';
import Oss from '../oss';
import Cdn from '../cdn';
import Fc from '../fc';

const { spinner, fse: fs } = core;
const JAMSTACK_OSS = 'jamstack-oss';
const JAMSTACK_FC = 'jamstack-fc';

export default class AddJamstack {
  static async domain(params: IJamstack, credential: ICredentials) {
    if (params.type === JAMSTACK_OSS) {
      return await this.jamstackOss(params, credential);
    } else if (params.type === JAMSTACK_FC) {
      return await this.jamstackFc(params, credential);
    }

    throw new Error('Domain configuration error, please refer to https://github.com/devsapp/domain');
  }

  static async jamstackFc(params: IJamstack, credential: ICredentials) {
    const tokenRs = await api.token(params);
    const {
      Token: token,
      Domain: domain = '',
    } = tokenRs.Body;

    const vm = spinner('Deploy helper function.');
    try {
      await Fc.deploy(credential, params.region, token);
      await sleep(1500);
      vm.succeed('Deployed.');
    } catch (ex) {
      vm.fail('Failed to deploy helper function.');
      throw ex;
    }

    const sources = [
      { type: 'fc_domain', port: 80, content: params.customDomain },
    ];
    if (params.bucket) {
      sources.push({ type: 'oss', port: 80, content: `${params.bucket}.oss-${params.region}.aliyuncs.com` });
    }
    const domainParams: any = { ...params, token };
    domainParams.cname = await this.addCdnDomain(credential, domainParams, domain, sources);

    await api.domain(domainParams);

    await Fc.remove(credential, params.region);
    return domain;
  }

  static async jamstackOss(params: IJamstack, credential: ICredentials) {
    const tokenRs = await api.token(params);
    const { bucket, region, customDomain } = params;
    const {
      Token: token,
      Domain: domain = '',
    } = tokenRs.Body;
    const savePath = await Oss.saveFile(bucket, token);

    logger.debug('Put file to oss start...');
    await Oss.put(region, bucket, credential, savePath);
    logger.debug('Put file to oss end.');

    const sources = [
      { type: 'oss', port: 80, content: `${bucket}.oss-${region}.aliyuncs.com` },
    ];
    if (customDomain) {
      sources.push({ type: 'fc_domain', port: 80, content: params.customDomain });
    }
    const domainParams: any = { ...params, token };
    domainParams.cname = await this.addCdnDomain(credential, domainParams, domain, sources);

    await api.domain(domainParams);
    await fs.remove(savePath);
    return domain;
  }

  private static async addCdnDomain(credential, domainParams, domain, sources) {
    const cdn = new Cdn(credential);
    await cdn.makeOwner(domainParams, { jamstack: domain.split('.')[0] });
    return await cdn.mackCdnDomain(domain, sources);
  }
}
