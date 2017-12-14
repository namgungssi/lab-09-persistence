'use strict';


const http = require('http');
const router = require('../lib/router.js');
const route = require('../lib/car/route.js');


let isRunning = false;


//start server
const app = http.createServer (router.route);


module.exports = {
  start : () => {
    return new Promise ((resolve, reject) => {
      if (! isRunning) {
        app.listen (process.env.PORT, (err) => {
          if (err) {
            reject (err);

          } else {
            isRunning = true;
            resolve (`Server is up on PORT ${process.env.PORT}`);
          }
        });

      } else {
        reject ('Server is already running');

      }
    });
  },

  stop : () => {
    return new Promise ((resolve, reject) => {
      if (! isRunning) {
        reject ('Server is off');

      } else {
        app.close (err => {
          if (err) {
            reject (err);

          } isRunning = false;
          resolve ('Turning off');
        });
      }
    });
  },
};
