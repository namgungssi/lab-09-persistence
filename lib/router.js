'use strict';


const parser = require ('../lib/parse-request.js');


const routeHandlers = {
  GET : {},
  PUT : {},
  POST : {},
  PATCH : {},
  DELETE : {},

};


module.exports = {
  get : (uri, callback) => {
    routeHandlers.GET[uri] = callback;
  },

  post : (uri, callback) => {
    routeHandlers.POST[uri] = callback;
  },

  patch : (uri, callback) => {
    routeHandlers.PATCH[uri] = callback;
  },

  delete : (uri, callback) => {
    routeHandlers.DELETE[uri] = callback;
  },

  route : (req, res) => {
    parser (req)
    .then ((req) => {
      let handler = routeHandlers [req.method] [req.url.pathname];

      if (handler) {
        return handler (req, res);

      } else {
        console.error ('Missing Not Found', req.url.pathname);
        res.writeHead (404);
        res.end();

      }
    })
    .catch ((err) => {
      console.error ('Invalid Request');
      res.writeHead (400);
      console.log ('Invalid Here');
      res.end ();

    });

  },
};
