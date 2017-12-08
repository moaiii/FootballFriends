import React from 'react';
import PropTypes from 'prop-types';


class FormInput extends React.PureComponent {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="form__input-container">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input 
          type={this.props.type} 
          name={this.props.name}
          onChange={(e) =>
            this.props.handleChange(e.target.name, e.target.value)} />
      </div>
    )
  };
};

FormInput.PropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

module.exports = FormInput;

