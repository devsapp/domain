/* eslint-disable no-await-in-loop */
import { spinner } from '@serverless-devs/core';
import logger from '../common/logger';
import { sleep, getPopClient } from './utils';
import { ICredentials } from '../interface';
import * as api from './api';

const POST = { method: 'POST' };
const DOMAIN = 'devsapp.net';

export default class Cdn {
  cdnClient: any;

  constructor(credentials: ICredentials) {
    this.cdnClient = getPopClient(credentials, 'https://cdn.aliyuncs.com', '2018-05-10');
  }

  async makeOwner(domainParams: any, verifyParams) {
    logger.debug('Check verify domain owner start...');
    const isDomainOwner = await this.verifyDomainOwner(DOMAIN);
    logger.debug(`Check verify domain owner end, response is: ${isDomainOwner}`);

    if (!isDomainOwner) {
      logger.debug('Get describe verify content start...');
      const verify = await this.describeVerifyContent(DOMAIN);
      logger.debug(`Get describe verify content end, response is: ${verify}`);

      await api.domain(domainParams);
      await api.verify({ ...verifyParams, verify });

      await sleep(1000);
      await this.makeOwner(domainParams, verifyParams);
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

  async mackCdnDomain(domain: string, sources) {
    logger.debug(`Add cdn domain start, domain is: ${domain}`);
    let cname = await this.hasDomainName(domain);
    logger.debug(`has cname: ${cname}`);
    if (cname) {
      await this.modifyCdnDomain(domain, sources);
    } else {
      cname = await this.addCdnDomain(domain, sources);
    }
    logger.debug(`Add cdn domain end. cname: ${cname}`);

    return cname;
  }

  async hasDomainName(domainName) {
    const pageSize = 50;
    let pageNumber = 0;
    let totalCount = 0;

    do {
      pageNumber = pageNumber + 1;
      const { Domains, TotalCount } = await this.cdnClient.request(
        'DescribeUserDomains',
        {
          pageSize, pageNumber,
        },
        POST,
      );
      logger.debug(`DescribeUserDomains responses: ${JSON.stringify(Domains)}`);
      for (const { Cname, DomainName } of (Domains?.PageData || [])) {
        if (DomainName === domainName) {
          return Cname;
        }
      }
      totalCount = TotalCount;
    } while (totalCount >= pageNumber * pageSize);

    return false;
  }

  async modifyCdnDomain(domainName: string, sources) {
    try {
      await this.cdnClient.request(
        'ModifyCdnDomain',
        {
          DomainName: domainName,
          Sources: JSON.stringify(sources),
        },
        POST,
      );
    } catch (ex) {
      if (ex.code !== 'DomainAlreadyExist') {
        throw ex;
      }
    }
  }

  async addCdnDomain(domainName: string, sources) {
    try {
      await this.cdnClient.request(
        'AddCdnDomain',
        {
          DomainName: domainName,
          Scope: 'global',
          CdnType: 'web',
          Sources: JSON.stringify(sources),
        },
        POST,
      );
    } catch (ex) {
      if (ex.code !== 'DomainAlreadyExist') {
        throw ex;
      }
    }

    const vm = spinner('get cdn cname...');
    try {
      const cname = await this.cdnDomainDetail(domainName, 0);
      vm.succeed();

      return cname;
    } catch (ex) {
      vm.fail();
      throw ex;
    }
  }

  async cdnDomainDetail(domainName, i: number) {
    const describeCdnDomainDetail = await this.cdnClient.request(
      'DescribeCdnDomainDetail',
      { DomainName: domainName },
      POST,
    );
    logger.debug(`DescribeCdnDomainDetail response is: ${JSON.stringify(describeCdnDomainDetail)}`);
    const cname = describeCdnDomainDetail.GetDomainDetailModel.Cname;

    if (!cname) {
      if (i > 90) {
        throw new Error('Not found cdn cname, please retry.');
      }
      await sleep(1000);
      return this.cdnDomainDetail(domainName, i + 1);
    }
    return cname;
  }
}
