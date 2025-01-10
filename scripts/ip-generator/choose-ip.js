module.exports = {
  chooseBestIp(ips) {
    const ipArray = Object.entries(ips);

    const wifiIp = ipArray.find(v => /Wi-Fi/i.test(v[0]))?.[1][0];
    if (wifiIp) return wifiIp;
    
    const ethernetIp = ipArray.find(v => /Ethernet/i.test(v[0]))?.[1][0];
    if (ethernetIp) return ethernetIp;

    return ipArray[0]?.[1][0];
  }
}