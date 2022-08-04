import _ from 'lodash';
import dns from 'dns';
import { sleep } from '@serverless-devs/core';
import logger from '../common/logger';


interface INslookupOptions {
  retryTimes?: number;
  timing?: number;
  times?: number;
}

const default_nslookup_options = { retryTimes: 100, times: 0, timing: 3 };

async function lookup(domain: string) {

  return await new Promise((resolve, _reject) => {
    dns.resolveCname(domain, async (err, address) => {
      if (err) {
        logger.debug(`dns check eror: ${err}`);
        resolve(false);
      } else {
        logger.debug(`address: ${address}`);
        resolve(true);
      }
    });
  });
}

export async function nslookup(domain: string, options: INslookupOptions = { }) {
  const payload = _.defaults(options, default_nslookup_options);
  const { retryTimes, times, timing } = payload;
  const status = await lookup(domain);
  if (status || times >= retryTimes) {
    return;
  }

  await sleep(timing * 1000);
  payload.times = times + 1;
  await nslookup(domain, payload);
}
