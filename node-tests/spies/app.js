var db = require('./db');

var handleSignup = (email, password) => {
  db.saveUser({email, password});
}
handleSignup('ermyas@example.com', '1233455');
module.exports.handleSignup = handleSignup;
