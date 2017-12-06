import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Pitch extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  };

  render() {
    return (
      <div>
        <h1>Pitch View</h1>
      </div>
    );
  };
};

Pitch.PropTypes = {};

module.exports = Pitch;
