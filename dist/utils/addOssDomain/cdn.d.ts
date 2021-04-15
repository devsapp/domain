import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../../interface';
export default class Cdn {
    logger: ILogger;
    cdnClient: any;
    constructor(credentials: ICredentials);
    makeOwner(bucket: string, region: string, token: string): Promise<void>;
    verifyDomainOwner(domainName: string): Promise<boolean>;
    describeVerifyContent(domainName: string): Promise<string>;
    addCdnDomain(domainName: string, bucket: string, region: string): Promise<string>;
}
