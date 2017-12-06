'use strict';

import React from 'react';


class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  };

  componentDidMount() {
    console.log("Form props: ", this.props)
  };

  handleChange(event) {
    console.log("handling change... ", event)
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form__container">
        {this.props.form}
      </div>
    )
  };
};

module.exports = FormContainer;