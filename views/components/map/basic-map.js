// functional imports
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-type';

// custom imports
import google_maps_api_key from "../../../config";


class BasicMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact
        apiKey={google_maps_api_key}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
        {props.children}
      </GoogleMapReact>
    );
  }
};

BasicMap.PropTypes = {
  children: PropTypes.element
};

export default BasicMap;

//TODO: 
// Different types of maps
// 1. showing user only
// 2. showing user and friends
// 3. showing pitches only
// 4. showing routes to and from home and pitches


// MARKER e.g.

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// <AnyReactComponent
//   lat={59.955413}
//   lng={30.337844}
//   text={'Kreyser Avrora'}
// />