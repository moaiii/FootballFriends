const SquadModel = require('./squad.model');
const UserModel = require('../user/user.model');


// app.delete('/squad', authenticate, squadRoute.delete_squad);
exports.delete_squad = (req, res) => {};


// app.patch('/squad', authenticate, squadRoute.update_squad);
exports.update_squad = (req, res) => {};


// app.post('/squad', authenticate, squadRoute.create_squad);
exports.create_squad = (req, res) => {
  if(typeof req.user._id !== 'undefined') {

    // concat to ensure the creator is included as a player
    let allPlayers = [...req.body.player, req.user.email];

    let players = allPlayers.map(email => {
      return UserModel.findByEmail(email)
        .then(user => {
          return user._id;
        })
    });

    Promise.all(players)
      .then(playerIDs => {
        let squad = new SquadModel({
          name: req.body.squadName,
          _creator: req.user._id,
          _players: playerIDs
        });
    
        // save to squad DB
        squad.save()
          .then(squad => {
            // add a link to this squad in the creators doc
            UserModel.findByToken(req.token)
              .then(creator => {
                creator.addSquad(squad._id, squad.name, true) // isCreator = true
                  .then(() => {

                    let playerSquadRef = playerIDs.map(id => {
                      return UserModel.findById(id)
                        .then(user => {
                          user.addSquad(squad._id, squad.name, false) // isCreator = false
                        })
                        .catch(e => {
                          console.log("~! Error adding squad ID to player @ create_squad", e);
                        });
                    });

                    Promise.all(playerSquadRef) 
                      .then(() => {
              
                        res
                          .redirect(`/squad/${squad._id}`);
                      })
                      .catch(e => {
                        console.log("~! Error creating squad response @ create_squad", e);
                      });
                  })
                  .catch(e => {
                    console.log("~! Error adding players to squad @ create_squad", e);
                  });
              })
              .catch(e => {
                console.log("~! Error adding creator to squad @ create_squad", e);
              })
          })
          .catch(e => {
            console.log("~! Error saving squad @ create_squad", e);
          });
      })
      .catch(e => {
        console.log("~! Error getting players by email @ create_squad", e);
      });
    
  } else {
    console.log("~! Creating squad but user object not available");
  }
};


// app.get('/squad', authenticate, squadRoute.get_squads);
exports.get_squad = (req, res) => {

  let squadID = req.params.id;

  SquadModel.findById(squadID)
    .then(squad => {
      // find the captain in DB
      UserModel.findById(squad._creator)
      .then(captain => {
          // find the players in DB
          let players = squad._players.map(player => {
            return UserModel.findById(player);
          });

          Promise.all(players)
            .then(playerObjects => {

              res.render('squad/squad', {
                squad: squad,
                captain: captain,
                players: playerObjects
              });
            })
            .catch(e => {
              console.log("~! Error getting player promises @ GET_SQUAD", e);
            });
        })
        .catch(e => {
          console.log("~! Error getting captain @ GET_SQUAD", e);
        });
    })
    .catch(e => {
      console.log("~! Error getting squad object @ GET_SQUAD", e);
    });
};


