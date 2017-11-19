var UserModel = require('../src/models/user.model');


exports.remove_token = function(req, res) {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).redirect('/');
    }, () => {
      res.status(400).send();
    })
};


/**
 * FROM -> app.post('/user/login', userRoute.login);
 * @param {object} req 
 * @param {object} res 
 */
exports.login = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  UserModel.findByCredentials(email, password)
    .then((user) => {
      user.generateAuthToken()
        .then((object) => {
          localStorage.setItem(FF_TOKEN, object.token);

          res
            .header('x-auth', object.token)
            .render('user', {
              me: object.user
            });
        })
    })
    .catch((e) => {
      // cant find user
      res.status(400).send(e);
    })
};


/**
 * FROM -> app.post('/user', user_route.create_user);
 * @param {object} req 
 * @param {object} res 
 */
exports.create_user = function(req, res) {
  
  var user = new UserModel({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    postCode: req.body.postCode
  });

  user.save()
    .then(() => {
      return user.generateAuthToken();

    }).then((object) => {
      res
        .header('x-auth', object.token)
        .render('user', {
          me: object.user
        });
    }).catch((e) => {
      res.status(400).send(e);
    });
};


/**
 * FROM -> app.get('/user/me', authenticate, user_route.show_me);
 * @param {object} req 
 * @param {object} res 
 */
exports.show_me = function(req, res) {
  // the user object patch on to the request 
  // by the authentication middleware
  res.render('user', {
    user: req.user
  });
};