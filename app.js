var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var reactViews = require('express-react-views');
var {authenticate} = require('./middleware/authenticate');

/**
 * Routes
 */
var indexRoute =    require('./routes/index.route');
var userRoute =     require('./routes/user.route');
var gameRoute =     require('./routes/game.route');
var squadRoute =     require('./routes/squad.route');
var pitchRoute =    require('./routes/pitch.route');


/**
 * Database connection
 */
var db_config = require('./mongo.config');
var mongoose = require('mongoose');

// Mongoose's default promise library is deprecated, plug in your own promise
// connection string to bitnami server
var dbUri = `mongodb://${db_config.value.username}:${db_config.value.password}@${db_config.value.ip}.${db_config.value.region}.compute.amazonaws.com:${db_config.value.port}/${db_config.value.db}`;
var dbUri_process = 'mongodb://' +
  process.env.FF_DB_USERNAME + ':' + 
  process.env.FF_DB_PASSWORD + '@' + 
  process.env.FF_DB_IP + '.' + 
  process.env.FF_DB_REGION + 
  '.compute.amazonaws.com:' + 
  process.env.FF_DB_PORT + '/' + 
  process.env.FF_DB_DB;

console.log(process.env.FF_PORT);
console.log(dbUri_process);

var dbPromise = mongoose.connect(dbUri, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;


dbPromise
  .then(function(db) {
    console.log('DB connection established');
  
  })
  .catch(function(error) {
    console.error('connection to db failed', error);
  });


/**
 * EXPRESS Setup
 */
var app = express();

/**
 * Express app global variables
 */
app.locals.title = 'Football Friends';


/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Express view engine = JSX
 */
var options = {
  beautify: true,
  transformViews: true
};

app.engine('jsx', reactViews.createEngine(options));


/**
 * API endpoints
 */
app.get('/', indexRoute.index);

app.delete('/player/me/token', authenticate, playerRoute.remove_token);
app.post('/player/login', playerRoute.login);
app.get('/player/me', authenticate, playerRoute.get_me);
app.post('/player', playerRoute.create_player);

app.delete('/company/me/token', authenticate, companyRoute.remove_token);
app.post('/company/login', companyRoute.login);
app.get('/company/me', authenticate, companyRoute.get_me);
app.post('/company', companyRoute.create_user);

app.delete('/game/:id', authenticate, gameRoute.delete_game);
app.patch('/game/:id', authenticate, gameRoute.update_game);
app.get('/game/:id', authenticate, gameRoute.get_game);
app.get('/games', authenticate, gameRoute.my_games);
app.post('/game', authenticate, gameRoute.create_game);

app.delete('/pitch', authenticate, pitchRoute.delete_pitch);
app.patch('/pitch', authenticate, pitchRoute.update_pitch);
app.post('/pitch', authenticate, pitchRoute.create_pitch);
app.get('/pitch', authenticate, pitchRoute.get_pitches);

app.delete('/slot', authenticate, slotRoute.delete_slot);
app.patch('/slot', authenticate, slotRoute.update_slot);
app.post('/slot', authenticate, slotRoute.create_slot);
app.get('/slot', authenticate, slotRoute.get_slots);

app.delete('/squad', authenticate, squadRoute.delete_squad);
app.patch('/squad', authenticate, squadRoute.update_squad);
app.post('/squad', authenticate, squadRoute.create_squad);
app.get('/squad', authenticate, squadRoute.get_squads);


/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
 * error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
