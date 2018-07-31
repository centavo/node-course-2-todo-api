var {User} = require('./../models/user');

//creating middleware to be used by many other functions
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
//User.findByToken returns a promise so we can use .then.  Called with user
//which might be null
  User.findByToken(token).then((user) => {
    if (!user) {
//if no user, want to return status 401 - which is what we do in the .catch
//so we can just reject the promise here and the .catch block will run
    return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
