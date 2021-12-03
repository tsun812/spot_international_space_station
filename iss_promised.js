const request = require('request-promise-native');
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  let resParse = JSON.parse(body)
  let longitude = resParse['longitude'];
  let latitude = resParse['latitude'];
  url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url)
}

const nextISSTimesForMyLocation = function(body) {
  // empty for now
  let timestamps = JSON.parse(body).response
  let res = []
  for(let i = 0; i <=4; i++){
    let datePass = new Date()
    datePass.setUTCSeconds(timestamps[i].risetime)
    let duration = timestamps[i]['duration']
    res.push(`next headover time is ${datePass}, for duration ${duration} seconds`)
  }  
  return res;
}

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation}