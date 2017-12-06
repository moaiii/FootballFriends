var React = require('react');

// custom imports
// import GoogleApiWrapper from '../map/googlemap';
var CompanyUser = require('./company');
var PlayerUser = require('./player');


class User extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {};

  render() {

    let userType = this.props.me.isCompany 
      ? <CompanyUser me={this.props.me} />
      : <PlayerUser me={this.props.me} />;

    return (
      <div className="user__container">
        {userType}
        <form action="/user/me/logout" method="post">
          <button name="logout" value="logout">Logout</button>
        </form>
      </div>
    )
  }
};

module.exports = User;