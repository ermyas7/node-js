var env = process.env.NODE_ENV || 'development';
if(env === 'test' || 'development'){
  var config = require('./config.json');
  var envConfig = config[env]
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })

}

// if(env === 'test'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
//
// }
// else if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
// }
