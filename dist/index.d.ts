import { ILogger } from '@serverless-devs/core';
export default class Compoent {
    logger: ILogger;
    get(inputs: any): Promise<string>;
}
