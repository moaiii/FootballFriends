var axios = require('axios');


exports.logout = function(user) { 
  console.log("INSIDE LOGOUT API: ", user);
  return new Promise((resolve, reject) => {
    axios.delete('http://localhost:3000/user/me/token', {
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