// functional imports
import React, { Component } from 'react';
import PropTypes from 'prop-type';


class Marker extends Component {

  render() {
    return (
      <div
        lat={props.lat}
        lng={props.lng}
        name={props.name}
        text={props.text} >
      </div>
    );
  }
};

Marker.PropTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
  text: PropTypes.string
};

export default Marker;