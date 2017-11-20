var PlayerModel = require('../src/models/player.model');


exports.remove_token = function(req, res) {
  req.player.removeToken(req.token)
    .then(() => {
      res.status(200).redirect('/');
    }, () => {
      res.status(400).send();
    })
};


/**
 * FROM -> app.post('/player/login', playerRoute.login);
 * @param {object} req 
 * @param {object} res 
 */
exports.login = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  PlayerModel.findByCredentials(email, password)
    .then((player) => {
      player.generateAuthToken()
        .then((object) => {
          localStorage.setItem(FF_TOKEN, object.token);
          localStorage.setItem(TOKEN_TYPE, 'player');

          res
            .header('x-auth', object.token)
            .render('player', {
              me: object.player
            });
        })
    })
    .catch((e) => {
      // cant find player
      res.status(400).send(e);
    })
};


/**
 * FROM -> app.post('/player', player_route.create_player);
 * @param {object} req 
 * @param {object} res 
 */
exports.create_player = function(req, res) {
  
  var player = new PlayerModel({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    postCode: req.body.postCode
  });

  player.save()
    .then(() => {
      return player.generateAuthToken();

    }).then((object) => {
      res
        .header('x-auth', object.token)
        .render('player', {
          me: object.player
        });
    }).catch((e) => {
      res.status(400).send(e);
    });
};


/**
 * FROM -> app.get('/player/me', authenticate, player_route.get_me);
 * @param {object} req 
 * @param {object} res 
 */
exports.get_me = function(req, res) {
  // the player object patch on to the request 
  // by the authentication middleware
  res.render('player', {
    player: req.player
  });
};