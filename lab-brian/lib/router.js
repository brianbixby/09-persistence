'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');
const response = require('./response.js');
// get post put or delete urls and parse posts and put requests

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
  // there are req methods, they are going to pick up on req.method
  // router consturctor has a single property that then contains its own sub-object which has it's own objects of get, post, put and delete
  // creating method to bind to routes
};

// create prototype method that will leverage this

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
  // creates key value pairs, for each req method in this.routes; 
  // GET: {'/api/cats': callback}
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req),
    ])
      .then( () => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        response.sendText(res, 404, 'route not found');
        console.error('route not found');
      })
      .catch(err => {
        response.sendText(res, 400, 'bad request');
        console.error(err);
      });
  };
};