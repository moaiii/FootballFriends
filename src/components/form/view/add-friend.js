'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// custom imports
import FormInput from './form-input';


class AddFriend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {

    return (
      <div className="signup">
        <h4>Add friend</h4>
        <form action="/user/friend" method="POST">
          <FormInput name={"email"} label={"Email: "} type={"email"}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
};

module.exports = AddFriend;
