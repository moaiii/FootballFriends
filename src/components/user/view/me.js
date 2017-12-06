import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormContainer from '../../form/view/form-container';
import CreateGame from '../../form/view/create-game';
import CreateSquad from '../../form/view/create-squad';
import AddFriend from '../../form/view/add-friend';
import acceptFriend from '../../user/user.api';


class Me extends React.Component {
  constructor(props) {
    super(props);

    this._acceptFriend = this._acceptFriend.bind(this);
  };

  componentDidMount() {};

  _acceptFriend(friendID = null) {
    console.log("~! friendID", friendID);

    acceptFriend()
      .then(res => {
        console.log("~! Friend accepted in player view", res);
      })
      .catch(e => {
        console.log("~! Error accepting friend", e);
        throw(e);
      });
  };

  render() {

    let friends = this.props.User.userInfo.friends.map(function(friend, index) {
      return(
        <div classNaUser="user__friend" key={`${index}-friend`}>
          <p>{friend.email}</p>
          {!friend.accepted 
            ? <button
                onClick={console.log(this._acceptFriend)} 
                classNaUser="friend__accept">Accept</button>
            : null }
        </div>
      );
    }, this);

    let squads = this.props.me.userInfo.squads.map((squad, index) => {
      return(
        <div className="user__squad" key={`${index}-squad`}>
          <a href={`/squad/${squad._id}`}>{squad.name}</a>
        </div>
      )
    })

    return (
      <div className="user__container --player">

        <div className="user-hero__container">
          <h1>Player</h1>
          <h3>Hello {this.props.me.firstName} {this.props.me.lastName}</h3>
        </div>

        <div className="user-info__container">
          <p>{this.props.me.email}</p>
          <p>{this.props.me.username}</p>
          <p>{this.props.me.postCode}</p>
        </div>
        
        <div className="player-friends__container">
          <h4>My friends</h4>
          <div className="friends__list">
            {friends}
          </div>
          <FormContainer form={ <AddFriend /> } />
        </div>

        <div className="player-squads__container">
          <h4>My squads</h4>
          <div className="squads__list">
            {squads}
          </div>
          <FormContainer form={ <CreateSquad /> } />
        </div>
      </div>
    )
  }
};

Me.PropTypes = {
  me: PropTypes.shape({
    isCompany: PropTypes.boolean,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    postcode: PropTypes.string
  })
};

module.exports = Me;