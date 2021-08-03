import Pop from '@alicloud/pop-core';
import { loadComponent } from '@serverless-devs/core';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPopClient = (credentials, endpoint, apiVersion) => {
  return new Pop({
    endpoint,
    apiVersion,
    accessKeyId: credentials.AccessKeyID,
    accessKeySecret: credentials.AccessKeySecret,
    // @ts-ignore: Set SecurityToken
    securityToken: credentials.SecurityToken,
    opts: {
      timeout: 10 * 1000,
    },
  });
};

export async function getFcEndpoint(): Promise<string | undefined> {
  const fcDefault = await loadComponent('devsapp/fc-default');
  const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
  if (!fcEndpoint) { return undefined; }
  const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
  if (!(enableFcEndpoint === true || enableFcEndpoint === 'true')) {
    return undefined;
  }
  if (fcEndpoint.includes('//')) {
    return fcEndpoint.split('//')[1];
  }
  return fcEndpoint;
}
