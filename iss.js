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
    if (resParse === null) callback("some error occured", null)
    else {
      let longitude = resParse['longitude'];
      let latitude = resParse['latitude'];
      const res = [longitude,latitude]
      callback(null, res)
    }
  });
}
module.exports = { fetchMyIP, fetchMyIPCoordinate};