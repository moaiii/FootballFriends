const User = require('../src/models/user.model');


var authenticate = function(req, res, next) {
  let token =  req.header('x-auth');

  User.findByToken(token)
    .then(user => {
      if(!user) return Promise.reject();

      // patch on the found users details to the request 
      // as it flows through the middleware on to the next function
      req.user = user;
      req.token = token;

      next();
    })
    .catch(e => {
      console.error('Authentication failed', e);
      res.status(401).send();
    });
};

module.exports = {authenticate}