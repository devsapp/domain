import fs from 'fs-extra';
import logger from '../../common/logger';
import Oss from '../oss';
import Cdn from '../cdn';
import * as api from '../api';
import { IOSSTOKEN } from '../../interface';
/**
 * VerifyDomainOwner  验证域名归属权
 * DescribeVerifyContent   异常获取Content值
 * VerifyDomainOwner 再次校验
 */

export default class AddOssDomain {
  static async domain(params: IOSSTOKEN, credential: any) {
    const tokenRs = await api.token(params);

    const { bucket, region } = params;
    const token = tokenRs.Body.Token;
    const domain = `${bucket}.oss.devsapp.net`;
    const savePath = await Oss.saveFile(bucket, token);

    logger.debug('Put file to oss start...');
    await Oss.put(region, bucket, credential, savePath);
    logger.debug('Put file to oss end.');

    const cdn = new Cdn(credential);
    await cdn.makeOwner({ bucket, region, token, type: 'oss' }, { bucket });
    logger.debug(`Add cdn domain start, domain is: ${domain}`);
    const sources = [
      { type: 'oss', port: 80, content: `${bucket}.oss-${region}.aliyuncs.com` },
    ];
    const cname = await cdn.mackCdnDomain(domain, sources);
    logger.debug('Add cdn domain end.');

    await api.domain({ bucket, region, token, type: 'oss', cname });

    await fs.remove(savePath);

    return domain;
  }
}
