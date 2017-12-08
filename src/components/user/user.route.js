'use strict';
var UserModel = require('./user.model');


exports.logout = function(req, res) {
  req.user.removeToken(req.token)
    .then(() => {
      // destory server session tokens
      req.session.destroy(function(err) {
        if(err) throw err;
      });

      res.status(200).redirect('/');
      
    }, () => {
      res.status(400).send();
    })
};


/**
 * FROM -> router.post('/user/login', userRoute.login);
 * @param {object} req 
 * @param {object} res 
 */
exports.login = function(req, res) {

  let email = req.body.email;
  let password = req.body.password;

  UserModel.findByCredentials(email, password)
    .then((user) => {

      user.generateAuthToken()
        .then((object) => {
          req.session.user = object.user;
          req.session.token = object.token;
          
          res.send({token: object.token});
        })
    })
    .catch((e) => {
      console.log('Cant get login @ promise', e);
      res.status(400).send(e);
    })
};


/**
 * FROM -> router.post('/user', user_route.create_user);
 * @param {object} req 
 * @param {object} res 
 */
exports.create_user = function(req, res) {

  let user; // undefined

  // if(typeof req.body.isCompany === 'undefined') {
  if(req.query.company === 'true') {
    user = new UserModel({
      isCompany: req.body.isCompany,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      postcode: req.body.postcode,
      companyInfo: {
        businessName: req.body.businessName,
        registeredBusinessAddress: req.body.registeredBusinessAddress,
        vatRegistrationNumber: req.body.vatRegistrationNumber,
        phoneNumber: req.body.phoneNumber
      }
    });

  } else {
    user = new UserModel({
      isCompany: false,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      postcode: req.body.postcode
    });
  };

  if(typeof user !== 'undefined') {
    user.save()
      .then(() => {
        return user.generateAuthToken();
  
      }).then((object) => {
        // set token in the session
        req.session.token = object.token;
        console.log('req.session: ', req.session);
  
        res.redirect('/user/me');
  
      }).catch((e) => {
        res.status(400).send(e);
      });

  } else {
    console.error("User is undefined in USER.ROUTE");
  }
};


/**
 * FROM -> router.get('/user/me', authenticate, user_route.get_me);
 * @param {object} req 
 * @param {object} res 
 */
exports.get_me = function(req, res) {

  let token =  typeof req.session.token === 'undefined'
    ? req.header('x-auth')
    : req.session.token;

  User.findByToken(token)
    .then(user => {
      if(!user) {
        return Promise.reject();
      } else {
        resolve({user});
      }
    })
    .catch(e => {
      console.error('Cannot get user in get_me', e);
      res.status(401).redirect('/');
    });
    res.send({user});
};


/**
 * FROM -> router.post('/user/friends', authenticate, userRoute.add_friend);
 * @param {object} req 
 * @param {object} res 
 */
exports.add_friend = function(req, res) {

  let friendsEmail = req.body.email;

  // Look up friends email in DB
  UserModel.findByEmail(friendsEmail)
    .then(friend => {
      // Get my user object from DB
      UserModel.findByToken(req.token)
        .then(me => {
          // Add friend to my friend log
          me.addFriend(friend, true) // accepted = true
            .then(myFriends => {
              // Add me to my friends friend list
              friend.addFriend(me, false) // accepted = true
                .then(theirFriends => {
                  res.send({myFriends, theirFriends});
                })
            })
        });
    })
};


exports.accept_friend = function(req, res) {

  let friendID = req.header('x-friend-id');
  // let myID = req.header('x-my-id');

  UserModel.findByToken(req.token)
    .then(me => {
      me.acceptFriend(friendID)
        .then(response => {
          console.log("USER ROUTE accept_friend: ", response);
        })
    })

};


/**
 * FROM -> router.get('/user/friends', authenticate, userRoute.get_friends);
 * @param {object} req 
 * @param {object} res 
 */
exports.get_friends = function(req, res) {
  UserModel.findByToken(req.token)
    .then((user) => {
      user.getFriends()
        .then(friends => {
          res.send(friends);
        })
    });
};


exports.update_travel = function(req, res) {
  UserModel.findByToken(req.token)
    .then((user) => {
      user.getFriends()
        .then(friends => {
          res.send(friends);
        })
    });
};