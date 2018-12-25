const yargs   = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
var arg = yargs
.options({
  'address': {
    demandOption: true,
    alias: 'a',
    describe: 'address to fetch weather',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(arg.address, (errorMassage, results) => {
  if(errorMassage){
    console.log(errorMassage);
  }
  else{
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMassage, weatherResults) => {
      if(errorMassage){
        console.log(errorMassage);
      }
      else{
        console.log(`it's currently ${weatherResults.temprature} F and it feels like ${weatherResults.apparentTemperature} F`);
      }
    });
  }
});
