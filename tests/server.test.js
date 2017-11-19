const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../../app');
const {Game} = require('./../src/models/game.model');
const {games, populateGames, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateGames);

describe('POST /game', () => {
  it('should create a new todo', (done) => {
    var newGame = {
      date: new Date(2017, 5, 20),
      time: '19:00',
      price: '7.50',
      aside: 5, 
    };

    request(app)
      .post('/game')
      .send({newGame})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Game.find({newGame}).then((games) => {
          expect(games.length).toBe(1);
          expect(games[0].newGame).toBe(newGame);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Game.find().then((games) => {
          expect(games.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /games', () => {
  it('should get all games', (done) => {
    request(app)
      .get('/games')
      .expect(200)
      .expect((res) => {
        expect(res.body.games.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /games/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/games/${games[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.game.text).toBe(games[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/process.env.FF_SECURITY_SECRET')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/process.env.FF_SECURITY_SECRET')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
