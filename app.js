require('babel-register');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var reactViews = require('express-react-views');
var session = require('express-session');

// DATABASE
var db_config = require('./mongo.config');
var mongoose = require('mongoose');

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


// EXPRESS INIT
var app = express();

// EXPRESS GLOBAL VARIABLES
app.locals.title = 'Football Friends';

// EXPRESS VIEW ENGINE
app.set('store', path.join(__dirname, 'src/store.js'));
app.set('types', path.join(__dirname, 'src/types.js'));

/**
 * The jsx engine can only compile (babel) views in the /views folder
 * Therefore we cant keep .jsx files with their module folders
 * https://github.com/reactjs/express-react-views#views
 */
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: process.env.FF_SESSION_SECRET}));
app.use(express.static(path.join(__dirname, 'public')));

//Express view engine = JSX
var options = {
  beautify: true,
  transformViews: true
};

app.engine('jsx', reactViews.createEngine(options));

// APP ROUTES
app.use(require('./src/app/app.route'));
// app.get('/', appRoutes);

// 404 ERRORS
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("err: ", err);
  // render the error page
  res.status(err.status || 500);
  res.send(`<h1>Error @ the server</h1>
    <p>${err.message}</p>
    <p>${err.stack}</p>
  `);
});

module.exports = app;
