var React = require('react');

import FormInput from './form-input';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  };

  render() {
    return (
      <div className="login">
        <h4>Login</h4>
        <form action="/user/login" method="POST">
          <FormInput name={"email"} label={"Email: "} type={"email"}/>
          <FormInput name={"password"} label={"Password: "} type={"password"}/>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
};

module.exports = Login;