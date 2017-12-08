const User = require('../components/user/user.model');


var authenticate = function(req, res, next) {

  let token =  typeof req.session.token === 'undefined'
    ? req.header('x-auth')
    : req.session.token;

  console.log("Authenticating token: ", token 
    ? "..." + token.substr(token.length - 10, token.length)
    : "n/a");

  User.findByToken(token)
    .then(user => {

      console.log("Authentication success: ", user.email);

      if(!user) return Promise.reject();

      // patch on the found users details to the request 
      // as it flows through the middleware on to the next function
      req.user = user;
      // console.log("Adding USER object to requests: ", req.user);
      req.token = token;

      localhost.setItem('FF_USER', JSON.stringify(user))

      next();
    })
    .catch(e => {
      console.error('Authentication failed', e);
      res.status(401).redirect('/');
    });
};

module.exports = {authenticate}