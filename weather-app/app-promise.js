const yargs   = require('yargs');
const axios = require('axios');
require('dotenv').config();

var argv = yargs
.options({
  'address': {
    demandOption: true,
    alias: 'a',
    describe: 'address to fetch weather',
    string: true,
    default: 'Addis ababa'
  }
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&&searchtext=${encodedAddress}`;

axios.get(geocodeURL
)
.then((response) => {

  if(response.data.Response.View.length === 0){
    console.log('unable to find that address.');
  }
  else{

    var address = response.data.Response.View[0].Result[0].Location.Address.Label;
    var latitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    var longitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    const weatherURL = `https://api.darksky.net/forecast/${process.env.WEATHER_API}/${latitude},${longitude}`;
    console.log(address);
    return axios.get(weatherURL);
    }
})
.then((response) => {
  var temprature          =  response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`it's currently ${temprature} F and it feels like ${apparentTemperature} F`);
})
.catch((err) => {
  //console.log(err);
  console.log('can not connect to the  API server!');
});
