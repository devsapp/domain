import { IV1Inputs, IInputs } from '@serverless-devs/core';
import Pop from '@alicloud/pop-core';
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const tranfromV1InputsToInputs: (inputs: IV1Inputs) => IInputs;
export declare function checkRs(rs: any): void;
export declare const getPopClient: (credentials: any, endpoint: any, apiVersion: any) => Pop;
