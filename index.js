const {fetchMyIP, fetchMyIPCoordinate, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss')
fetchMyIP((error, ip) => {
  if(error) console.log("error:", error)
  else console.log(ip)
})
fetchMyIPCoordinate((error, ipCoordinate) => {
  if(error) {
    console.log("error:", error)
    return null
  }
  else {
    //console.log(ipCoordinate)
    fetchISSFlyOverTimes(ipCoordinate, (error, headOverTimes) => {
      if(error) console.log("error:", error)
      else {
       // console.log(headOverTimes)
        nextISSTimesForMyLocation(headOverTimes);
      }
    })
    
  }
})
