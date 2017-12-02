const config = require('../../config');
const axios = require('axios');
const fs = require('fs');


/**
 * Turns address into longitude and latitude data 
 * for use with the google maps browser api
 * @param {string} postcode 
 */
const geocodeAddress = (postcode) => {
  return new Promise((resolve, reject) => {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?"
      + "address=" 
      + postcode.replace(/\s/g, '+').trim()
      + "&key=" 
      + config.google_geocoding_api_key

    console.log("Geocoding: ", url);

    axios
      .get(url)
      .then(json => {
        resolve({
          lat: json.data.results[0].geometry.location.lat,
          lng: json.data.results[0].geometry.location.lng
        })

      })
      .catch(e => {
        console.log("~! Error geocoding address", e);
        reject(e);
      })
  });
};

module.exports = {
  geocodeAddress
};