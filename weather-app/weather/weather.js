const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
      url: `https://api.darksky.net/forecast/${process.env.WEATHER_API}/${latitude},${longitude}`,
      json: true
  }, (err, response, body) => {
    if(err){
      callback('unable to connect to forcast server.');
    }
    else if(!err && response.statusCode === 200){
      callback(undefined, {
        temprature : body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else{
        callback('unable to fetch forcast.');
    }
  });
}

module.exports = {
  getWeather
};
