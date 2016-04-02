
const body = require('koa-body');
const koa = require('koa.io');
const app = koa();
const path = require('path');
const favicon = require('koa-favicon');
const router = require('koa-router')();
const config = require('./config');
const bunyan = require('bunyan');
const mongoose = require('mongoose');

const log = bunyan.createLogger(config.bunyan);
require('./config/mongoose');

app.on('error', (err, context) => {
  log.info(`Server error: ${err}\nContext: ${context}`);
});

// request body parser
app.use(body({formidable: {uploadDir: path.resolve(__dirname, '/uploads')}}));

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

// setup mongoose before routing
mongoose.connect(config.mongo.url, function(err) {
  if (err) {
    console.log('Mongo connection error', err);
  } else {
    console.log('Mongo connection successful');
  }
});

app.context.db = mongoose;

app.use(favicon(path.join(__dirname, '/favicon.ico')));
const homeRoute = require('./routes/home');
const coifferRoute = require('./routes/coiffeurs');
const serviceCategoryRoute = require('./routes/serviceCategories');
const serviceRoute = require('./routes/services');
const shoppeRoute = require('./routes/shoppes');

homeRoute(router);
coifferRoute(router);
serviceCategoryRoute(router);
serviceRoute(router);
shoppeRoute(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.io.use(function *(next) {

});

app.io.route('happen', function *(next) {

});

app.listen(config.port, function() {
  console.log(`server running on port ${config.port}`);
});

module.exports = app;
