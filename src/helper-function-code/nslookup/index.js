const dns = require('dns');

async function lookup(domain) {
  return await new Promise((resolve, _reject) => {
    dns.resolveCname(domain, async (err, address) => {
      if (err) {
        console.debug(`dns check eror: ${err}`);
        resolve(false);
      } else {
        console.debug(`address: ${address}`);
        resolve(true);
      }
    });
  });
}

async function nslookup(domain, payload) {
  const { retryTimes, times, timing } = payload;
  if (await lookup(domain)) {
    return true;
  } else if (times >= retryTimes) {
    return false;
  }

  await new Promise((resolve) => setTimeout(resolve, timing * 1000));
  payload.times = times + 1;
  return await nslookup(domain, payload);
}

exports.handler = async (event, _context, callback) => {
  const eventObj = JSON.parse(event.toString());
  console.log('inputs:', eventObj);
  const { domain, retryTimes, timing } = eventObj;
  const payload = {
    retryTimes: retryTimes || 5, times: 0, timing: timing || 3,
  };
  if (!domain) {
    callback(500, 'domain is empty');
  }
  const d = domain.includes('://') ? domain.split('://')[1] : domain;
  const status = await nslookup(d, payload);
  console.log('status: ', status);
  callback(null, JSON.stringify({ status }));
};
