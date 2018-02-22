'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Job Routes', function() {
  var job = null;
  describe('POST: /api/job', function() {
    it('should post and return a note', function(done) {
      request.post('localhost:3000/api/job')
        .send({ title: 'test title', salary: '$100,000'})
        .end((err, res) => {
          if(err) return done(err);
          job = JSON.parse(res.text);
          // console.log('res: ', res);
          // console.log('res text: ', res.text);
          expect(res.status).toEqual(200);
          expect(job.title).toEqual('test title');
          expect(job.salary).toEqual('$100,000');
          done();
        });
    });
  });
  describe('POST: /api/job', function() {
    it('should not post and return a 400 error', function(done) {
      request.post('localhost:3000/api/job')
        .send({  })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('GET: /api/job', function() {
    it('should return a job', function(done) {
      request.get(`localhost:3000/api/job?id=${job.id}`)
        .end((err, res) => {
          if(err) return done(err);
          job = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(job.title).toEqual('test title');
          expect(job.salary).toEqual('$100,000');
          done();
        });
    });
  });
  describe('GET: /api/job', function() {
    it('should return a 404 error', function(done) {
      request.get('localhost:3000/api/job?id=12')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
  describe('GET: /api/job', function() {
    it('should return a 400 error', function(done) {
      request.get('localhost:3000/api/job')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });


});
