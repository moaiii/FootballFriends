import axios from 'axios';

const login = (email, password) => {
  console.log('login API', email, password);
  
  return new Promise((resolve, reject) => {

    axios.post('/user/login', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      email,
      password
    })
      .then(response => {
        resolve(response.data.token)
      })
      .catch(e => {
        console.error('Error @ login api form', e);
      });
  });
};

module.exports = {
  login,

};