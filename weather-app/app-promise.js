///require project dependancies
const yargs   = require('yargs');
const axios = require('axios');
require('dotenv').config();

//get address and set options from command line
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
///encode Address
var encodedAddress = encodeURIComponent(argv.address);
////////////////////////////////////////////////////////
//ADD ID and APP CODE are environmental variables
/////geolocation url is set here
const geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&&searchtext=${encodedAddress}`;

/////make api request to geocoder
axios.get(geocodeURL
)
.then((response) => {
    /////if address is not valid
  if(response.data.Response.View.length === 0){
    console.log('unable to find that address.');
  }
  else{
    /////set address , longitude, latitude from the response data
    var address = response.data.Response.View[0].Result[0].Location.Address.Label;
    var latitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    var longitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    const weatherURL = `https://api.darksky.net/forecast/${process.env.WEATHER_API}/${latitude},${longitude}`;
    console.log(address);

    /////make forcast API request using weather URL
    return axios.get(weatherURL);
    }
})
.then((response) => {

  ////set temperature and actual temperature from API the response data
  var temprature          =  response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  /////log temprature
  console.log(`it's currently ${temprature} F and it feels like ${apparentTemperature} F`);
})
.catch((err) => {
  //console.log(err);
  //////log if there is error
  console.log('can not connect to the  API server!');
});
