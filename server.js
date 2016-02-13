'use strict';

const app = require('koa.io');
const router = require('koa-router')();

// app.use(favicon(__dirname + '/public/favicon.ico'));
const coifferRoute = require('./routes/coiffeur');

coifferRoute(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.io.use(function *(next){

});

app.io.route('happen', function *(next){

});
