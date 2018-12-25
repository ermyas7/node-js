
var getUser = (id, callback) => {
  var user = {
    id: id,
    username: 'Jack'
  }
  callback(user);
}

getUser(16, userObj => console.log(userObj))
