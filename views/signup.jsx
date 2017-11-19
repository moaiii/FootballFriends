var React = require('react');
var UserModel = require('../src/models/user.model');


class SignupForm extends React.Component {
  render() {
    return (
      <div>
        <form action="/signup" method="POST">
          <label htmlFor="email">Email</label>
          <input name="email" type="text" />
          <label htmlFor="password">Password</label>
          <input name="password" type="text" />
          <button type="submit" value="Submit">Signup</button>
        </form>
      </div>
    )
  }
};

module.exports = SignupForm;
