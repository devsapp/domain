import Pop from '@alicloud/pop-core';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function checkRs(rs: any) {
  if (rs.Status !== 'Success') {
    throw new Error(rs.Body);
  }
}

export const getPopClient = (credentials, endpoint, apiVersion) => {
  return new Pop({
    endpoint,
    apiVersion,
    accessKeyId: credentials.AccessKeyID,
    accessKeySecret: credentials.AccessKeySecret,
    // @ts-ignore
    securityToken: credentials.SecurityToken,
    opts: {
      timeout: 10 * 1000,
    },
  });
};
