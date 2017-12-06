import React from 'react';
import PropTypes from 'prop-types';

import geocodeAddress from '../../../src/api/map.api';


const GeocodeUserAddress = userComponent => 
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        geocode: {
          lng: null,
          lat: null
        }
      };
    };

    componentDidMount() {
      geocodeAddress(userComponent.postcode)
        .then(coord => {
          this.setState({
            geocode.lng: coord.lng,
            geocode.lat: coord.lat
          })
        })
        .catch(e => {
          console.error("~! Error in geocoding the address in the HOC", e);
          throw e;
        });
    };

    render() {
      return( <userComponent {...this.state}/> )
    };
  };

GeocodeUserAddress.PropTypes = {
  userComponent: PropTypes.element
};

export default GeocodeUserAddress(user);
