// src/server.js
'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/app/NotFoundPage';
var session = require('express-session');


// MONGO DATABASE 
var mongoose = require('mongoose');

var dbURL = 'mongodb://' +
  process.env.FF_DB_USERNAME + ':' + 
  process.env.FF_DB_PASSWORD + '@' + 
  process.env.FF_DB_IP + '.' +
  process.env.FF_DB_REGION + '.compute.amazonaws.com:' + 
  process.env.FF_DB_PORT + '/' + 
  process.env.FF_DB_DB;

var dbPromise = mongoose.connect(dbURL, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

dbPromise
  .then(function(db) {
    console.log('DB connection established on port', process.env.FF_DB_PORT);
  
  })
  .catch(function(error) {
    console.error('connection to db failed', error);
  });


// EXPRESS 
const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  secret: process.env.FF_SESSION_SECRET, 
  cookie: { 
    maxAge: 60000 
  }
}));
app.use(bodyParser.json());
app.use(require('./components/app/app.route'));

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});


// SERVER
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});