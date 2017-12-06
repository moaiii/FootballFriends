import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Slot extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  };

  render() {
    return (
      <div>
        <h1>Slot View</h1>
      </div>
    );
  };
};

Slot.PropTypes = {};

module.exports = Slot;
