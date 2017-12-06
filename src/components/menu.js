'use strict';

// src/components/menu.js

import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
    return (
      <nav className="athletes-menu">
          <Link key={1} to={`/`} activeClassName="active">
            "Test link"
          </Link>;
      </nav>
    );
  }
}