import React from 'react';
import PropTypes from 'prop-types';

import FormContainer from '../form/view/form-container';
import CreateGame from '../form/view/create-game';


class SquadView extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {};

  render() {

    let players = this.props.players.map((player, index) => {
      return(
        <div className="squad__player" key={`${index}-squad-player`}>
          <p>{`${player.firstName} ${player.lastName}`}</p>
        </div>
      )
    });

    return (
      <div className="squad__container">
        <div className="squad-hero__container">
          <h1>Squad</h1>
        </div>
        <div className="user-info__container">
          <h4>{this.props.squad.name}</h4>
          <p>{this.props.squad.description || 'No description yet.'}</p>
        </div>
        <div className="squad-captain__container">
          <h4>Captain</h4>
          <p>{`${this.props.captain.firstName} ${this.props.captain.lastName}`}</p>
        </div>
        <div className="squad-captain__container">
          <h4>Players</h4>
          {players}
        </div>
        <div className="squad__create-game-container">
          <FormContainer form={ <CreateGame /> } />
        </div>
      </div>
    )
  }
};

SquadView.PropTypes = {};

module.exports = SquadView;