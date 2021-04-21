import Pop from '@alicloud/pop-core';
import _ from 'lodash';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function checkRs(rs: any) {
  if (rs.Status !== 'Success') {
    throw new Error(rs.Body);
  }
}

export const getPopClient = (credentials, endpoint, apiVersion) => {
  return new Pop({
    endpoint: endpoint,
    apiVersion: apiVersion,
    accessKeyId: credentials.AccessKeyID,
    accessKeySecret: credentials.AccessKeySecret,
    opts: {
      timeout: 10 * 1000,
    },
  });
};
