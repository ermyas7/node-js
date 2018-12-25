const yargs   = require('yargs');

const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(arg.address);
