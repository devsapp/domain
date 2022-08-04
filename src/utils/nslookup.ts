import _ from 'lodash';
import { lookup } from 'dns';
import { sleep } from '@serverless-devs/core';
import logger from '../common/logger';


interface INslookupOptions {
  retryTimes?: number;
  timing?: number;
  times?: number;
}

const default_nslookup_options = { retryTimes: 20, times: 0, timing: 5 };

export async function nslookup(domain: string, options: INslookupOptions = { }) {
  const payload = _.defaults(options, default_nslookup_options);
  const { retryTimes, times, timing } = payload;

  return await new Promise((resolve, reject) => {
    lookup(domain, async (err, address, family) => {
      if (err) {
        logger.debug(`dns check eror: ${err}`);
        if (times > retryTimes) {
          reject('DNS resolution failed, please try again');
        } else {
          await sleep(timing * 1000);
          payload.times = times + 1;
          logger.debug(`dns check eror, retry times ${payload.times}`);
          await nslookup(domain, payload);
        }
      } else {
        logger.debug(`address: ${address}\nfamily: ${family}`);
        resolve('');
      }
    });
  });
}
