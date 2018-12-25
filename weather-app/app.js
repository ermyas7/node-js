const request = require('request')

request({
  url: 'http://www.mapquestapi.com/geocoding/v1/address?key=ut6ndAn7OBjyejJjovJBARbfrjc7xqhc&location=NIT%20Road%20Fakiratilla%20Silchar',
  json: true
}, (err, response, body) => {
  if(err){
    console.log(err)
  }
  else{
    console.log('-----------------------------------')
    console.log(body.results[0].locations)
  }
})
