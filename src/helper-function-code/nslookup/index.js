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
  const { domain, retryTimes } = eventObj;
  const payload = {
    retryTimes: retryTimes || 60, times: 0, timing: 3,
  };
  const status = await nslookup(domain, payload);
  console.log('status: ', status);
  callback(null, JSON.stringify({ status }));
};
