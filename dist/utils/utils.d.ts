import Pop from '@alicloud/pop-core';
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const getPopClient: (credentials: any, endpoint: any, apiVersion: any) => Pop;
export declare function getFcEndpoint(): Promise<string | undefined>;
