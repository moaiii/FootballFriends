import axios from 'axios';

const login = () => {
  return new Promise((resolve, reject) => {

    axios.post('/user/login', {
      headers: {

      }
    })
      .then(response => {
        console.log('Login res', login);
        
      })
      .catch(e => {
        console.error('Error @ login api form', e);
      });
  });
};

module.exports = {
  login,

};