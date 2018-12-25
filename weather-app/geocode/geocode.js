const request = require('request');
require('dotenv').config()

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&&searchtext=${encodedAddress}`,
    json: true
  }, (err, response, body) => {

    if(err){
      callback('can not connect to the  geocoder server!');
    }
    else if(body.type === 'ApplicationError'){
      callback('address can not be empty!');
    }
    else if(body.Response.View.length === 0){
      callback('unable to find that address.');
    }
    else{
      callback(undefined, {
        address : body.Response.View[0].Result[0].Location.Address.Label,
        latitude : body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
        longitude: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
      });
    }
  });
}

module.exports = {
  geocodeAddress
}
