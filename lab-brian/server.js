'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const jobRouter = require('./route/job-route.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

jobRouter(router);
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`server up ${PORT}`);
});