import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './form-input';

class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (
      <div className="signup">
        <h4>Create Game</h4>
        <form action="/game" method="POST">
          <FormInput 
            name={"date"} 
            label={"Date: "} 
            type={"date"}/>
          <FormInput 
            name={"aside"} 
            label={"Players per team: "} 
            type={"aside"}/>
          <FormInput 
            name={"price"} 
            label={"Price: "} 
            type={"price"}/>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
};

module.exports = CreateGame;
