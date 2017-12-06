'use strict';

import React from 'react';


class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  };

  handleSubmit(type) {
    console.log('Submit type', type);
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