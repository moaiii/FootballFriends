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
        <FormInput 
          name={"email"} 
          label={"Email: "} 
          type={"email"} 
          handleChange={(name, value) =>
            this.props.handleChange('login', name, value)}/>

        <FormInput 
          name={"password"} 
          label={"Password: "} 
          type={"password"}
          handleChange={(name, value) => 
            this.props.handleChange('login', name, value)}/>

        <button 
          type="submit" 
          onClick={() => 
            this.props.handleSubmit('login', this.state)}>
          Login
        </button>
      </div>
    )
  }
};

module.exports = Login;