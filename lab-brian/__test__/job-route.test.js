'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Job Routes', () => {
  var job = null;

  describe('POST: /api/job', () => {
    it('should post and return a note', done => {
      request.post('localhost:3000/api/job')
        .send({ title: 'test title', salary: '$100,000'})
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

  describe('POST: /api/job', () => {
    it('should not post and return a 400 error', (done) => {
      request.post('localhost:3000/api/job')
        .send({ })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: /api/job', () => {
    it('should return a job', (done) => {
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
  
  describe('GET: /api/job', () => {
    it('should return a 404 error', (done) => {
      request.get('localhost:3000/api/job?id=12')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

  describe('GET: /api/job', () => {
    it('all job file names', (done) => {
      request.get('localhost:3000/api/job')
        .end((err, res) => {
          expect(err).toBe(null);
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text)).toEqual([`${job.id}.json`]);
          done();
        });
    });
  });

  // http PUT :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc title=developer salary=100,000
  describe('PUT: /api/job', () => {
    it('should update a job and return the updated job', (done) => {
      request.put('localhost:3000/api/job')
        .query(`id=${job.id}`)
        .send({ title: 'updated title', salary: 'updated salary'})
        .end((err, res) => {
          if(err) return done(err);
          job = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(job.title).toEqual('updated title');
          expect(job.salary).toEqual('updated salary');
          done();
        });
    });
  });
  
  describe('PUT: /api/job', () => {
    it('should not update and return a 400 error', (done) => {
      request.put('localhost:3000/api/job')
        .send({ })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('DELETE: /api/job', () => {
    it('should delete a job', (done) => {
      request.delete('localhost:3000/api/job')
        .query(`id=${job.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(204);
          console.log(res.text);
          done();
        });
    });
  });

  describe('DELETE: /api/job', () => {
    it('should not delete and return a 400 error', (done) => {
      request.delete('localhost:3000/api/job')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

});
