const { chooseBestIp } = require('./choose-ip.js');
const { getIps } = require('./get-ips.js');
const { createIpFiles } = require('./create-ip-files.js');

const ips = getIps();
const bestIp = chooseBestIp(ips);

console.log(`Found best IP address: ${bestIp}`);

createIpFiles(bestIp);
