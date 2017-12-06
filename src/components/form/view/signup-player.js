var React = require('react');
import PropTypes from 'prop-types';

import FormInput from './form-input';


class SignupPlayer extends React.Component {
  render() {

    let hideCheckbox = {
      display: "none"
    };

    return (
      <div className="signup">
        <h4>Player Sign up</h4>
        <form action="/user" method="POST">
          <FormInput 
            name={"email"} 
            label={"Email: "}
            type={"email"}/>
          <FormInput 
            name={"password"} 
            label={"Password: "} 
            type={"password"}/>
          <FormInput 
            name={"firstName"} 
            label={"First name: "} 
            type={"text"}/>
          <FormInput 
            name={"lastName"} 
            label={"Last name: "} 
            type={"text"}/>
          <FormInput 
            name={"postcode"} 
            label={"Postcode: "} 
            type={"text"}/>
          <button type="submit">Signup</button>
        </form>
      </div>
    )
  }
};

module.exports = SignupPlayer;
