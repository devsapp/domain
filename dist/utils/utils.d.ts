import Pop from '@alicloud/pop-core';
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function checkRs(rs: any): void;
export declare const getPopClient: (credentials: any, endpoint: any, apiVersion: any) => Pop;
