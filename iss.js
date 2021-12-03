const request = require('request')
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const fetchMyIP = function(callback) { 
  request('https://api.ipify.org?format=json', (error, response, body) => {
    let res = JSON.parse(body)
    if (res === null) callback("some error occured", null)
    else {
      let ipAddress = res.ip;
      callback(null, ipAddress)
    }
  });
}
//917fc250-53ea-11ec-b125-6f644b378914
const fetchMyIPCoordinate = function(callback) { 
  let apikey = 'apikey=917fc250-53ea-11ec-b125-6f644b378914'
  let url = 'https://api.freegeoip.app/json/?'+apikey
  request(url, (error, response, body) => {
    let resParse = JSON.parse(body)
    if (resParse === null) {
      callback("some error occured", null)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    else {
      let longitude = resParse['longitude'];
      let latitude = resParse['latitude'];
      const res = [longitude,latitude]
      callback(null, res)
    }
  });
}
// https://iss-pass.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE.

const fetchISSFlyOverTimes = function(coords, callback) {
  let long = coords[0]
  let lat = coords[1]
  url = `https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`
  request(url, (error, response, body) => {
    let resParse = JSON.parse(body)
    if (resParse === null) callback("some error occured", null)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching iss head over times. Response: ${body}`;
      callback(Error(msg), null)
    }
    else {
      return callback(null, resParse.response)
    }

  })
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(timestamps) {
  // empty for now
  let res = []
  console.log(timestamps)
  for(let i = 0; i <=4; i++){
    let datePass = new Date()
    datePass.setUTCSeconds(timestamps[i].risetime)
    //console.log(timestamps[i])
    let duration = timestamps[i]['duration']
    res.push(`next headover time is ${datePass}, for duration ${duration} seconds`)
  }  
  console.log(res);
}
module.exports = { fetchMyIP, fetchMyIPCoordinate, fetchISSFlyOverTimes, nextISSTimesForMyLocation};