const GameModel = require('../src/models/game.model');


/**
 * FROM -> app.get('/games', authenticate, gameRoute.my_games);
 * @param {object} req 
 * @param {object} res 
 */
exports.my_games = function(req, res) {
  GameModel.find({
    _creator: req.user._id // look for games with _creator = our middleware _id
  })
    .then((games) => {
      res.send({games});
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};


/**
 * FROM -> app.post('/game', authenticate, gameRoute.create_game);
 * @param {object} req 
 * @param {object} res 
 */
exports.create_game = function(req, res) {

  console.log("req.user._id, ", req.user._id);

  let date = req.body.date.split("-");

  let day = date[0];
  let month = date[1];
  let year = date[2];
  // let hour = date[3];
  // let minute = date[4];
  // let seconds = date[5];

  let game = new GameModel({
    date: new Date(year, month, day, 0, 0, 0, 0),
    aside: req.body.aside,
    price: req.body.price,
    _creator: req.user._id
  });

  game.save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((e) => {
      res.status(400).send(e);
    })
};


/**
 * FROM -> app.get('/game/:id', authenticate, gameRoute.get_game);
 * @param {object} req 
 * @param {object} res 
 */
exports.get_game = function(req, res) {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  GameModel.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then((game) => {
      if(!game) return res.status(404).send();

      res.send({game});
    })
    .catch((e) => {
      res.status(400).send();
    })
};


/**
 * FROM -> app.get('/game/:id', authenticate, gameRoute.game);
 * @param {object} req 
 * @param {object} res 
 */
exports.delete_game = function(req, res) {
  let id = req.params.id;
  
    GameModel.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    })
      .then((game) => {
        if(!game) return res.status(404).send();
  
        res.send({game});
      })
      .catch((e) => {
        res.status(400).send();
      })
};


/**
 * FROM -> app.get('/game/:id', authenticate, gameRoute.game);
 * @param {object} req 
 * @param {object} res 
 */
exports.update_game = function(req, res) {
  let id = req.params.id;

  let date = req.body.date.split("-");
  let day = date[0];
  let month = date[1];
  let year = date[2];
  let hour = date[3];
  let minute = date[4];
  let seconds = date[5];

  let aside = req.body.id;
  let price = req.body.price;

  GameModel.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    date: new Date(year, month, day, hour, minute, seconds, 0)
  }, {
    aside: aside
  }, {
    price: price
  })
    .then((game) => {
      if(!game) return res.status(404).send();

      res.send({game});
    })
    .catch((e) => {
      res.status(400).send();
    });
};