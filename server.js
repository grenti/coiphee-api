
const koa = require('koa.io');
const app = koa();
const path = require('path');
const favicon = require('koa-favicon');
const router = require('koa-router')();
const config = require('./config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name: 'coiphee-api',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: 'error.log'  // log ERROR and above to a file
    }
  ]
});

// x-response-time
app.use(function *(next) {
  var start = new Date();
  yield next;
  const ms = new Date() - start;
  this.set('X-Response-Time', `${ms} ms`);
  this.set('Server-Type', 'SirGrenti\'s');
});

// logger
app.use(function *(next) {
  var start = new Date();
  yield next;
  const ms = new Date() - start;
  log.info('%s %s - %s', this.method, this.url, ms);
  // console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(favicon(path.join(__dirname, '/favicon.ico')));
const homeRoute = require('./routes/home');
const coifferRoute = require('./routes/coiffeur');

homeRoute(router);
coifferRoute(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.io.use(function *(next) {

});

app.io.route('happen', function *(next) {

});

app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
});
