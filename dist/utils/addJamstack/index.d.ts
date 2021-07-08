import { IJamstack, ICredentials } from '../../interface';
export default class AddJamstack {
    static domain(params: IJamstack, credential: ICredentials): Promise<any>;
    static jamstackFc(params: IJamstack, credential: ICredentials): Promise<any>;
    static jamstackOss(params: IJamstack, credential: ICredentials): Promise<any>;
    private static addCdnDomain;
}
