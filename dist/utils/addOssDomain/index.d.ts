import { ILogger } from '@serverless-devs/core';
import { IOSSTOKEN } from '../../interface';
/**
 * VerifyDomainOwner  验证域名归属权
 * DescribeVerifyContent   异常获取Content值
 * VerifyDomainOwner 再次校验
 */
export default class AddOssDomain {
    logger: ILogger;
    domain(params: IOSSTOKEN, credential: any): Promise<string>;
}
