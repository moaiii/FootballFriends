var React = require('react');

import FormInput from './form-input';

class PlayerTravel extends React.Component {
  constructor() {
    super();

    this.state = {};

  };

  render() {
    return (
      <div className="form__player-travel">
        <h4>Travel preferences</h4>
        <form action="/user/travel" method="POST">
          <FormInput 
            type={"number"}
            name={"travelRadius"} 
            label={"Travel radius (miles): "} />
          <FormInput 
            type={"text"}
            name={"travelMethod"} 
            label={"Default mode of transport: "} />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
};

module.exports = PlayerTravel;
