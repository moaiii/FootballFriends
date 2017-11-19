var React = require('react');
var logout = require("../src/api/user.api").logout;

class UserView extends React.Component {

  constructor(props) {
    super(props);

    this._handleLogout = this._handleLogout.bind(this);
  };

  _handleLogout() { debugger;
    logout(this.props.user.tokens.token[0]);
  };

  render() {

    // let tokens = this.props.user.tokens.map(token => {
    //   return <p>{token.token}</p>
    // })

    return (
      <div>
        <h1>Hello {this.props.me.firstName} {this.props.me.lastName}</h1>
        <p>{this.props.me.email}</p>
        <p>{this.props.me.username}</p>
        <p>{this.props.me.postCode}</p>

        <button
          onClick={logout(this.props.me)}>
          Logout
        </button>

        <div className="form__create-game">
        <h4>Start a game</h4>
        <form action="/game" method="post">
          <label htmlFor="date">Date:</label>
          <input type="date" name="date" />
          <label htmlFor="price">Price:</label>
          <input type="text" name="price" />
          <label htmlFor="aside">Players per team:</label>
          <input type="text" name="aside" />
          <button type="submit">Start game</button>
        </form>
      </div>

      </div>
    )
  }
};

module.exports = UserView;
