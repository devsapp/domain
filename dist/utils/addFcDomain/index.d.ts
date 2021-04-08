import { ILogger } from '@serverless-devs/core';
import { IFCTOKEN } from '../../interface';
export default class AddFcDomain {
    static logger: ILogger;
    static domain(params: IFCTOKEN, credential: any): Promise<string>;
}
