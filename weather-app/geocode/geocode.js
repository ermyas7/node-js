const request = require('request');
require('dotenv').config()

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&&searchtext=${encodedAddress}`,
    json: true
  }, (err, response, body) => {

    if(err){
      console.log('can not connect to the server!');
    }
    else if(body.type === 'ApplicationError'){
      console.log('address can not be empty!');
    }
    else if(body.Response.View.length === 0){
      console.log('address invalid!');
    }
    else{
      console.log('Address : ',body.Response.View[0].Result[0].Location.Address.Label);
      console.log('Latitude: ',body.Response.View[0].Result[0].Location.DisplayPosition.Latitude);
      console.log('Longitude: ',body.Response.View[0].Result[0].Location.DisplayPosition.Longitude);
    }
  })
}

module.exports = {
  geocodeAddress
}
