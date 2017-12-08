import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import * as formAPI from '../form.api';


class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  /**
   * Store the input fields value in this state object
   * @param {string} type 
   * @param {string} name 
   * @param {string} value 
   */
  handleChange(type, name, value) {
    this.setState((prevState, props) => {
      return {
        [name]: value
      }
    });
  };

  /**
   * Switch terminal calling various api points
   * @param {string} type 
   * @param {string} form 
   */
  handleSubmit(type, form) {
    let $ = this.state;

    switch(type) {
      case 'login':
        formAPI.login($.email, $.password)
          .then(token => {
            browserHistory.push('/user/me');
          })
          .catch(e => console.log('Error logging in', e));
      
      default: null;
    };
  };


  render() {
    const { children } = this.props;

    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { 
        handleSubmit: this.handleSubmit,
        handleChange: this.handleChange
      }));

    return (
      <div className="form__container">
        {childrenWithProps}
      </div>
    )
  };
};

FormContainer.propTypes = {
  children: PropTypes.element.isRequired
};

module.exports = FormContainer;