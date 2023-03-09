import { lodash as _ } from '@serverless-devs/core';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { IOSSTOKEN, IFCTOKEN, IJamstack } from '../interface';
import logger from '../common/logger';

const DOMAIN = 'http://domain.devsapp.net';
function checkRs(rs: any) {
  if (rs.Status !== 'Success') {
    throw new Error(rs.Body);
  }
}

async function request(url, payload) {
  if (!_.isEmpty(payload.body)) {
    const formData = new FormData();
    _.forIn(payload.body, (value, key) => {
      formData.append(key, value);
    });
    payload.body = formData;
  }

  const res = await fetch(url, payload);
  return (await res.json()).Response;
}

export async function token(params: IOSSTOKEN | IFCTOKEN | IJamstack) {
  logger.debug(`The request **/token parameter is: ${JSON.stringify(params)}`);
  const tokenRs = await request(`${DOMAIN}/token`, {
    method: 'post',
    body: params,
  });
  logger.debug(`Get token response is: ${JSON.stringify(tokenRs)}`);
  checkRs(tokenRs);
  return tokenRs;
}

export async function domain(params: any) {
  logger.debug(`The request **/domain parameter is: ${JSON.stringify(params)}`);
  const dRs = await request(`${DOMAIN}/domain`, {
    method: 'post',
    body: params,
  });
  logger.debug(`The request **/domain response is: ${JSON.stringify(dRs)}`);
  checkRs(dRs);

  return dRs;
}

export async function verify(params: any) {
  logger.debug(`The request **/verify parameter is: ${JSON.stringify(params)}`);
  const rs = await request(`${DOMAIN}/verify`, {
    method: 'post',
    body: params,
    hint: {
      success: 'End of request',
      error: 'Request failed',
      loading: 'Request verify....',
    },
  });

  logger.debug(`The request **/verify response is: ${JSON.stringify(rs)}`);
  checkRs(rs);
  return rs;
}
