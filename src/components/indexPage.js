'use strict';

// src/components/IndexPage.js
import React from 'react';
import * as map from './map/map.api';

export default class IndexPage extends React.Component {
  constructor() {
    super();

    this.foo = this.foo.bind(this);
  };

  foo() {
    map.geocodeAddress('G116AL')
      .then(data => {
        console.log(data)})
  };

  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          <h1 onClick={this.foo}>Index Page</h1>
        </div>
      </div>
    );
  }
}