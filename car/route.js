'use strict';


const Car = require('../model/car.js');
const router = require('../lib/router.js');
const fs = require('fs-extra');


let dbFile = (__dirname + '../storage/car.dat');
let cars = {};


let sendStatus = function (res, status, text) {
  res.writeHead (status);
  res.write (text);
  res.end ();
};


let sendJSON = function (res, status, data) {
  res.writeHead (status, {
    'Content-Type' : 'application/json',
  });

  res.write (JSON.stringify(data));
  res.end ();

};



router.post ('/api/cars', (req, res) => {
  if (!req.body.make) {
    return sendStatus (res, 400, 'error missing make info');
  }
  if (!req.body.model) {
    return sendStatus (res, 400, 'error missing model info');
  }


  let car = new Car (req.body);
  let data = {};
  data [car.id] = car;
  let saveCar = JSON.stringify(data);


  fs.outputFile (dbFile, saveCar)
  .then (sendJSON (res, 201, car))
  .catch (err => {sendStatus (res, 500, err);});

});



router.get ('/api/cars', (req, res) => {

  let id = req.url && req.url.query && req.url.query.id;


  if (id) {
    fs.readJSON (dbFile)
    .then (allCars => {
      let car = allCars[id];
      sendJSON (res, 200, car);
    })
    .catch (err => sendStatus (res, 404, err));

    if(cars[id]) {
      sendJSON (res, 200, cars[id]);

    } else {

      fs.readJSON (dbFile)
      .then (allCars => sendJSON (res, 200, allCars))
      .catch (err => sendStatus (res, 404, err));
    }
  });



router.delete ('/api/cars', (req, res) => {

  let id = req.url && req.url.query && req.url.query.id;


  if (id) {
    fs.readJSON (dbFile)
      .then (allCars => {
        delete allCars [id];
        let saveCar = JSON.stringify (allCars);
        fs.outputFile (dbFile, saveCar)
        .then (sendJSON (res, 200, 'success'));
      })
      .catch (err => sendStatus (res, 500, err));

    }
  });
};
