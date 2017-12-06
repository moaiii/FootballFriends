'use strict';

// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/appRoutes';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};