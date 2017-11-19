const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');


// BCRYPT EXAMPLE

let password = process.env.FF_SECURITY_SECRET;

// 10 = round - make it take longer so no one can brute force
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('hash =', hash);
  });
});

var hashedPassword = '$2a$10$6mGEAIbCDM6wi/9q6VHSHOSwlweUMjdI8JultRkzYq6THzYdKnl06';

// result is either true or false
bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log('result = ', result);
});


// JWT EXAMPLE

// let message = "I am user number 3";
// let hash = SHA256(message).toString();

// console.log(`Message: ${message} \n Hash: ${hash}`);

// let data = {
//   id: 4
// };

// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// // man in the middle attack!
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// if(resultHash === token.hash) {
//   console.log("Data not changed");
// } else {
//   console.log("Data not trustworthy!!");
// };