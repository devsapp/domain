import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
export default class Compoent {
    logger: ILogger;
    get(inputs: IInputs): Promise<string>;
}
