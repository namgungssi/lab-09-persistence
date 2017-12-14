'use strict';


process.env.PORT = 5500;


const server = require('../lib/server');
const superagent = require('superagent');


describe('api/cars', function() {
  beforeAll(server.start);
  afterAll(server.stop);


  describe('POST /api/cars', () => {

    test('should respond 200', () => {
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        make: 'this is the make',
        model: 'this is the model',
      })
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.make).toEqual('this is the make');
        expect(res.body.model).toEqual('this is the model');
      });
    });



    test('should respond 400 no make', () => {
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        model: 'this is the model',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });



    test('should respond 400 no model', () => {
      return superagent.post('http://localhost:5500/api/cars')
      .set('Content-Type', 'application/json')
      .send({
        make: 'this is the make',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
});
