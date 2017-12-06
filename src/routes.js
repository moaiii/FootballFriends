'use strict';

// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Home from './components/home/home';
import IndexPage from './components/indexPage';
import PageNotFound from './components/pageNotFound';

const routes = (
  <Route path="/" component={Home}>
    <IndexRoute component={IndexPage}/>
    <Route path="*" component={PageNotFound}/>
  </Route>
);