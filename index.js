const {fetchMyIP, fetchMyIPCoordinate} = require('./iss')
fetchMyIP((error, ip) => {
  if(error) console.log("error:", error)
  else console.log(ip)
})
fetchMyIPCoordinate((error, ipCoordinate) => {
  if(error) console.log("error:", error)
  else console.log(ipCoordinate)
})

