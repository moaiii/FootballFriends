'use strict';

import React from 'react';
import PropTypes from 'prop-types';


class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (
      <div className="form__input-container">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={this.props.type} name={this.props.name}
          onChange={this.handleChange}/>
      </div>
    )
  }
};

FormInput.PropTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

module.exports = FormInput;