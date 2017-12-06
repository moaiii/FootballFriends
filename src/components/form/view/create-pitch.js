import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './form-input';

class CreatePitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slots: 1
    };

    this._addToSlots = this._addToSlots.bind(this);
  };

  _addToSlots() {
    this.setState((prevState => {
      slots: prevState.slots++
    }), () => this.forceUpdate());
  };

  render() {

    let allTimeslots = function() {
      for(let i = 0; i < this.state.slots; i++) {
        return 
          <div className="pitch__timeslot">
            <FormInput 
              name={"startTime"} 
              label={"Start time: "} 
              type={"startTime"}/>
            <FormInput 
              name={"endTime"} 
              label={"End time: "} 
              type={"endTime"}/>
            <FormInput 
              name={"price"} 
              label={"Price: "} 
              type={"price"}/>
          </div>
        
      };
    };

    return (
      <div className="signup">
        <h4>Create Pitch</h4>
        <form action="/pitch" method="POST">
          <FormInput 
            name={"name"} 
            label={"Name: "} 
            type={"name"}/>    
          <FormInput 
            name={"id"} 
            label={"ID: "} 
            type={"id"}/>
          <div className="pitch__timeslot-container">
            {allTimeslots}
          </div>
          <button type="submit">Create</button>
          <h5 onClick={this._addToSlots}>Add time slot</h5>
        </form>
      </div>
    )
  }
};

module.exports = CreatePitch;
