const request = require('request');
const yargs   = require('yargs');

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

var address = encodeURIComponent(arg.a);
console.log(arg.a)
console.log(address)
request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=ut6ndAn7OBjyejJjovJBARbfrjc7xqhc&location=${address}`,
  json: true
}, (err, response, body) => {

  console.log('Latitude', body.results[0].locations[0].latLng.lat);
  console.log('Longitude', body.results[0].locations[0].latLng.lng);
})
