'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Job = require('../model/job.js');

module.exports = function(router) {
  // http :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc
  router.get('/api/job', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('job', req.url.query.id)
        .then( job => {
          response.sendJSON(res, 200, job);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
    else if(!req.url.query.id) {
      storage.fetchDir('job')
        .then( job => {
          response.sendJSON(res, 200, job);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });


  // http POST :3000/api/job title=assistant salary=40,000
  router.post('/api/job', function(req, res) {
    try {
      var job = new Job(req.body.title, req.body.salary);
      storage.createItem('job', job);
      response.sendJSON(res, 200, job);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  // http DELETE :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc
  router.delete('/api/job', function(req, res) {
    if(req.url.query.id) {
      storage.deleteItem('job', req.url.query.id)
        .then( job => {
          response.sendText(res, 204, job);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  // http PUT :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc title=developer salary=100,000
  router.put('/api/job', function(req, res) {
    if(req.url.query.id){
      let updatedJob = {
        id: req.url.query.id,
        title: req.body.title,
        salary: req.body.salary,
      };
      storage.updateItem('job', req.url.query.id, updatedJob)
        .then( job => {
          response.sendJSON(res, 200, job);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};