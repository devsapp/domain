/* eslint-disable no-await-in-loop */
import logger from '../../common/logger';
import { sleep, getPopClient } from '../utils';
import { ICredentials } from '../../interface';
import * as api from '../api';

const POST = { method: 'POST' };
const DOMAIN = 'devsapp.net';

export default class Cdn {
  cdnClient: any;

  constructor(credentials: ICredentials) {
    this.cdnClient = getPopClient(credentials, 'https://cdn.aliyuncs.com', '2018-05-10');
  }

  async makeOwner(bucket: string, region: string, token: string) {
    logger.debug('Check verify domain owner start...');
    const isDomainOwner = await this.verifyDomainOwner(DOMAIN);
    logger.debug(`Check verify domain owner end, response is: ${isDomainOwner}`);

    if (!isDomainOwner) {
      logger.debug('Get describe verify content start...');
      const verify = await this.describeVerifyContent(DOMAIN);
      logger.debug(`Get describe verify content end, response is: ${verify}`);

      await api.domain({ bucket, region, token, type: 'oss' });
      await api.verify({ bucket, verify });

      await sleep(1000);
      await this.makeOwner(bucket, region, token);
    }
  }

  async verifyDomainOwner(domainName: string): Promise<boolean> {
    try {
      await this.cdnClient.request(
        'VerifyDomainOwner',
        {
          DomainName: domainName,
          VerifyType: 'dnsCheck',
        },
        POST,
      );

      return true;
    } catch (ex) {
      logger.debug(`VerifyDomainOwner domain name is ${domainName}, error is: \n ${ex}`);
      if (ex.code !== 'DomainOwnerVerifyFail') {
        throw ex;
      }

      return false;
    }
  }

  async describeVerifyContent(domainName: string): Promise<string> {
    const { Content } = await this.cdnClient.request(
      'DescribeVerifyContent',
      { DomainName: domainName },
      POST,
    );

    return Content;
  }

  async addCdnDomain(domainName: string, bucket: string, region: string) {
    try {
      await this.cdnClient.request(
        'AddCdnDomain',
        {
          DomainName: domainName,
          Scope: 'global',
          CdnType: 'web',
          Sources: JSON.stringify([
            { type: 'oss', port: 80, content: `${bucket}.${region}.aliyuncs.com` },
          ]),
        },
        POST,
      );
    } catch (ex) {
      if (ex.code !== 'DomainAlreadyExist') {
        throw ex;
      }
    }

    let i = 0;
    let cname = '';

    do {
      await sleep(1000);
      const describeCdnDomainDetail = await this.cdnClient.request(
        'DescribeCdnDomainDetail',
        {
          DomainName: domainName,
        },
        POST,
      );
      logger.debug(`DescribeCdnDomainDetail response is: ${JSON.stringify(describeCdnDomainDetail)}`);
      i += 1;
      cname = describeCdnDomainDetail.GetDomainDetailModel.Cname;
    } while (!(cname || i > 5));

    if (!cname) {
      throw new Error('Not found cdn cname, please retry.');
    }

    return cname;
  }
}
