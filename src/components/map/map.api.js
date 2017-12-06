'use strict';

const config = require('../../../config');
const axios = require('axios');


/**
 * Turns address into longitude and latitude data 
 * for use with the google maps browser api
 * @param {string} postcode 
 */
const geocodeAddress = (postcode) => {
  console.log("BAM");
  return new Promise((resolve, reject) => {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?"
      + "address=" 
      + postcode
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


/**
 * Get the distance between two locations in miles
 * @param {string} postcode 
 */
const getTravelData = (start, finish, mode = "subway", arrival = "", ) => {
  return new Promise((resolve, reject) => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json" 
      + "?units=imperial" 
      + "&origins=" + start.cleanPostcodeString() 
      + "&destinations=" + finish.cleanPostcodeString()
      + "&transit_mode=" + mode
      + "&arrival_time=" + arrival
      + "&key=" + config.google_distance_matrix_api_key;

    axios
      .get(url)
      .then(json => {
        resolve({
          distance: json.data.rows[0].elements[0].distance.text,
          duration: json.data.rows[0].elements[0].duration.text
        })

      })
      .catch(e => {
        console.log("~! Error geocoding address", e);
        reject(e);
      })
  });
};

function cleanPostcodeString(postcode) {
  return postcode.replace(/\s/g, '+').trim();
};

module.exports = {
  geocodeAddress,
  getTravelData
};