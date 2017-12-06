var React = require('react');

import FormInput from './form-input';
import * as formAPI from '../form.api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  };

  render() {
    return (
      <div className="login">
        <h4>Login</h4>
        <FormInput name={"email"} label={"Email: "} type={"email"}/>
        <FormInput name={"password"} label={"Password: "} type={"password"}/>
        <button 
          type="submit" 
          onClick={() => this.props.handleSubmit('login')}>
          Login
        </button>
      </div>
    )
  }
};

module.exports = Login;