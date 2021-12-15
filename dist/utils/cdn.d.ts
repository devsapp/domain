import { ICredentials } from '../interface';
export default class Cdn {
    cdnClient: any;
    constructor(credentials: ICredentials);
    makeOwner(domainParams: any, verifyParams: any): Promise<void>;
    verifyDomainOwner(domainName: string): Promise<boolean>;
    describeVerifyContent(domainName: string): Promise<string>;
    mackCdnDomain(domain: string, sources: any): Promise<any>;
    hasDomainName(domainName: any): Promise<any>;
    modifyCdnDomain(domainName: string, sources: any): Promise<void>;
    addCdnDomain(domainName: string, sources: any): Promise<any>;
    cdnDomainDetail(domainName: any, i: number): any;
}
