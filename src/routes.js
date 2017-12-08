// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/app/layout';
import Home from './components/home/home';
import Me from './components/user/view/me';
import NotFoundPage from './components/app/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/me" component={Me} me={}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;