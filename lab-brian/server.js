'use strict';

const http = require('http');
const Job = require('./model/job.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

// http :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc
router.get('/api/job', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('job', req.url.query.id)
      .then( job => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(job));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      });
    return;
  }
  else if(!req.url.query.id) {
    storage.fetchItems('job')
      .then( job => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(JSON.stringify(job));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('route not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

// http POST :3000/api/job title=assistant salary=40,000
router.post('/api/job', function(req, res) {
  try {
    var job = new Job(req.body.title, req.body.salary);
    storage.createItem('job', job);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(JSON.stringify(job));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

// http DELETE :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc
router.delete('/api/job', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('job', req.url.query.id)
      .then( job => {
        res.writeHead(204, {
          'Content-Type': 'text/plain',
        });
        res.write(`Deleted ${JSON.stringify(job)}`);
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('job not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

// http PUT :3000/api/job id==d973b78d-dfc2-44e2-8110-b20d4fcfd9dc title=developer salary=100,000
router.put('/api/job', function(req, res) {
  if(req.url.query.id){
    storage.updateItem('job', req.url.query.id, req.body.title, req.body.salary)
      .then( job => {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(`Updated ${JSON.stringify(job)}`);
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('job not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`server up ${PORT}`);
});