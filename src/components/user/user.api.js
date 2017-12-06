var axios = require('axios');

const ROOT_URL = process.env.NODE_ENV === 'production' 
  ? process.env.FF_ROOT_URL_PRODUCTION
  : process.env.FF_ROOT_URL_DEV;


exports.logout = function(user) { 
  console.log("INSIDE LOGOUT API: ", user);
  return new Promise((resolve, reject) => {
    axios.delete(process.env.ROOT_URL + '/user/me/token', {
      headers: {
        'token': user.tokens[0].token
      }
    }).then(response => {
      console.log(response);
      resolve(response);
      
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};


exports.acceptFriend = (friendID) => {
  console.log("In api ---", friendID);
  return new Promise((resolve, reject) => {
    axios.post(process.env.ROOT_URL + '/user/friend/accept', {
      headers: {
        'x-friend-id': friendID,
        'x-my-id': myID
      }

    }).then(response => {
      resolve(response);

    }).catch(e => {
      console.log("~! Error accepting friend in USER.API", e);
      reject(e);
    })
  });
};