'use strict';
// FUNCTIONAL MODULES
const express = require('express');
const router = express.Router();
import request from 'request';
import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';

import appRouter from '../client/router';
const routes = createRoutes(appRouter());
const {authenticate} = require('../../middleware/authenticate');

// router.get('*', (req, res) => {
//   match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
//     // check for error and redirection
//     const content = renderToString(<RouterContext {...renderProps}/>);
//     // pass content to jade view (we'll see it in a while)
//   })
// })

// ROUTES
var gameRoute = require('../game/game.route');
var homeRoute = require('./home.route');
var pitchRoute = require('../pitch/pitch.route');
var slotRoute = require('../slot/slot.route');
var squadRoute = require('../squad/squad.route');
var userRoute = require('../user/user.route');

// API ENDPOINTS
router.post('/user/me/logout', authenticate, userRoute.logout);
router.post('/user/login', userRoute.login);
router.post('/user/friend/accept', authenticate, userRoute.accept_friend);
router.post('/user/friend', authenticate, userRoute.add_friend);
router.post('/user/travel', authenticate, userRoute.update_travel);
router.get('/user/friends', authenticate, userRoute.get_friends);
router.get('/user/me', authenticate, userRoute.get_me);
router.post('/user', userRoute.create_user);

router.delete('/game/:id', authenticate, gameRoute.delete_game);
router.patch('/game/:id', authenticate, gameRoute.update_game);
router.get('/game/:id', authenticate, gameRoute.get_game);
router.get('/games', authenticate, gameRoute.my_games);
router.post('/game', authenticate, gameRoute.create_game);

router.delete('/pitch', authenticate, pitchRoute.delete_pitch);
router.patch('/pitch', authenticate, pitchRoute.update_pitch);
router.post('/pitch', authenticate, pitchRoute.create_pitch);
router.get('/pitch', authenticate, pitchRoute.get_pitches);

router.delete('/slot', authenticate, slotRoute.delete_slot);
router.patch('/slot', authenticate, slotRoute.update_slot);
router.post('/slot', authenticate, slotRoute.create_slot);
router.get('/slot', authenticate, slotRoute.get_slots);

router.delete('/squad', authenticate, squadRoute.delete_squad);
router.patch('/squad', authenticate, squadRoute.update_squad);
router.post('/squad', authenticate, squadRoute.create_squad);
router.get('/squad/:id', authenticate, squadRoute.get_squad);

router.get('/', homeRoute.goHome);

// EXPORT 
module.exports = router;