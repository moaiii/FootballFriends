// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header className="app__nav">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/user/me">
            <h2>My profile</h2>
          </Link>
          <Link to="/squad">
            <h2>Squad</h2>
          </Link>
        </header>
        <div className="app-content">
          {this.props.children}
        </div>
        <footer className="app__footer">
          <p>
            Football friends
          </p>
        </footer>
      </div>
    );
  }
};