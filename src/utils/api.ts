import { request } from '@serverless-devs/core';
import { IOSSTOKEN, IFCTOKEN, IJamstack } from '../interface';
import logger from '../common/logger';

const DOMAIN = 'http://domain.devsapp.net';
const HINT = {
  loading: 'Get token....',
  success: 'End of request',
  error: 'Request failed',
};
function checkRs(rs: any) {
  if (rs.Status !== 'Success') {
    throw new Error(rs.Body);
  }
}

export async function token(params: IOSSTOKEN | IFCTOKEN | IJamstack) {
  logger.debug(`The request **/token parameter is: ${JSON.stringify(params)}`);
  const tokenRs = await request(`${DOMAIN}/token`, {
    method: 'post',
    body: params,
    form: true,
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
    form: true,
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
    form: true,
    hint: { ...HINT, loading: 'Request verify....' },
  });

  logger.debug(`The request **/verify response is: ${JSON.stringify(rs)}`);
  checkRs(rs);
  return rs;
}
