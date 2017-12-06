import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './form-input';


class SignupCompany extends React.Component {
  render() {

    let hideCheckbox = {
      display: "none"
    };

    return (
      <div className="signup">
        <h4>Company Sign up</h4>
        <form action="/user?company=true" method="POST">
          <FormInput 
            name={"businessName"} 
            label={"Business name: "} 
            type={"text"}/>
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
            label={"Contact first name: "} 
            type={"text"}/>
          <FormInput 
            name={"lastName"} 
            label={"Contact last name: "} 
            type={"text"}/>
          <FormInput 
            name={"registeredBusinessAddress"} 
            label={"Address: "} 
            type={"text"}/>
          <FormInput 
            name={"postcode"} 
            label={"Postcode: "} 
            type={"text"}/>
          <FormInput 
            name={"phoneNumber"} 
            label={"Phone number: "}
            type={"tel"}/>
          <button type="submit">Signup</button>
        </form>
      </div>
    )
  }
};

module.exports = SignupCompany;
