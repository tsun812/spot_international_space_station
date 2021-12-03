const { nextISSTimesForMyLocation } = require("./iss")
const {fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes} = require("./iss_promised")
fetchMyIP()
.then(
  //console.log(response)
  fetchCoordsByIP
)
.then(
  fetchISSFlyOverTimes
)
.then(
  fetchISSFlyOverTimes
)
.then(
  nextISSTimesForMyLocation
)
.then(body => console.log(body))