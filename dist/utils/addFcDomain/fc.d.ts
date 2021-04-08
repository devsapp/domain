import { ILogger } from '@serverless-devs/core';
export default class Component {
    static client: any;
    static logger: ILogger;
    static remove(profile: any, regionId: string): Promise<void>;
    static deploy(profile: any, regionId: string, token: string): Promise<void>;
    static makeService(serviceConfig: any): Promise<void>;
    static makeFunction(functionConfig: any): Promise<void>;
    static makeTrigger(triggerConfig: any): Promise<void>;
}
