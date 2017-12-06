import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddFriend from '../../form/view/add-friend';


class PlayerUser extends React.Component {
  constructor(props) {
    super(props);

    this._acceptFriend = this._acceptFriend.bind(this);
  };

  componentDidMount() {};

  render() {

    let friends = this.props.me.userInfo.friends.map(function(friend, index) {
      return(
        <div className="user__friend" key={`${index}-friend`}>
          <p>{friend.email}</p>
          {!friend.accepted 
            ? <button
                onClick={console.log(this._acceptFriend)} 
                className="friend__accept">Accept</button>
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
    });

    return (
      <div className="user__container --player">

        <div className="user-hero__container">
          <h1>Player</h1>
          <h3>{this.props.me.firstName} {this.props.me.lastName}</h3>
        </div>

        <div className="user-info__container">
          <p>{this.props.me.username}</p>
        </div>
        
        <div className="player-friends__container">
          <h4>Friends</h4>
          <div className="friends__list">
            {friends}
          </div>
        </div>

        <div className="player-squads__container">
          <h4>Squads</h4>
          <div className="squads__list">
            {squads}
          </div>
        </div>
      </div>
    )
  }
};

PlayerUser.PropTypes = {
  me: PropTypes.shape({
    isCompany: PropTypes.boolean,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    postcode: PropTypes.string
  })
};

module.exports = PlayerUser;




// ACCEPT FRIEND BUTTON IN FOR LOOP 

// {!friend.accepted 
//   ? <button
//       onClick={() => console.log('hello')} 
//       className="friend__accept">Accept</button>
//   : null }