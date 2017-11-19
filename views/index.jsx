var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to {this.props.title}</h1>
        <div className="player__forms">
          <div className="login">
            <h2>Player</h2>
            <h4>Login</h4>
            <form action="/user/login" method="post">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password:</label>
              <input type="text" name="password" />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="signup">
            <h4>Sign up</h4>
            <form action="/user" method="post">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password:</label>
              <input type="text" name="password" />
              <label htmlFor="firstName">First name:</label>
              <input type="text" name="firstName" />
              <label htmlFor="lastName">Last name:</label>
              <input type="text" name="lastName" />
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" />
              <label htmlFor="postCode">Post code:</label>
              <input type="text" name="postCode" />
              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
        <div className="company__forms">
          <div className="login">
          <h2>Company</h2>
            <h4>Login</h4>
            <form action="/user/login" method="post">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password:</label>
              <input type="text" name="password" />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="signup">
            <h4>Sign up</h4>
            <form action="/user" method="post">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" />
              <label htmlFor="email">Password:</label>
              <input type="text" name="password" />
              <label htmlFor="username">Bussiness Name:</label>
              <input type="text" name="username" />
              <label htmlFor="firstName">Contact First name:</label>
              <input type="text" name="firstName" />
              <label htmlFor="lastName">Contact Last name:</label>
              <input type="text" name="lastName" />
              <label htmlFor="postCode">Post code:</label>
              <input type="text" name="postCode" />
              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = HelloMessage;
