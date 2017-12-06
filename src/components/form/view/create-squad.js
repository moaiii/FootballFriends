import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './form-input';

class CreateSquad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [{}, {}]
    };

    this._addPlayer = this._addPlayer.bind(this);
  };

  _addPlayer() {
    console.log('hello');
    this.setState({
      players: [...this.state.players, {}]
    });
  }

  render() {

    let players = this.state.players.map((player, index) => {
      return (
        <FormInput 
          key={`${index}-squad-player`}
          name={"player"} 
          label={`Player ${index}: `} 
          type={"text"} />
      )
    });

    return (
      <div className="signup">
        <h4>Create Squad</h4>
        <form action="/squad" method="POST">
          <FormInput
            name={"squadName"} 
            label={"Name: "} 
            type={"text"}/>
          <div className="squad__player-container">
            {players}
          </div>
          <button onClick={this._addPlayer}>Add player</button>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
};

module.exports = CreateSquad;
