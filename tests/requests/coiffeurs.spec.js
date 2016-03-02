'use strict';

process.env.NODE_ENV = 'test';
const config = require('../../config');
const factory = require('../factories/coiffeur');
const Coiffeur = require('../../models/coiffeur');
const mongooseConfig = require('../mongooseConfig');
const chai = require('chai');
const chaiHttp = require('chai-http');
const routeBuilder = require('../../routes/routeBuilder');
const should = chai.should();

const server = require('../../server');
const http = require('http');
// run the server locally for a test instance
http.createServer(server.callback()).listen(config.port);

chai.use(chaiHttp);
const serverUri = `${config.api.url}:${config.port}`;
console.log(`Server Uri: ${serverUri}`);
var savedCoiffeurs = [];

mongooseConfig();

describe('Coiffeurs', function() {
  before(function(done) {
    var coiffeurs = [];
    for (let i = 0; i < 15; i++) {
      coiffeurs.push(factory.build());
    }

    Coiffeur.insertMany(coiffeurs, function(err, docs) {
      if (err) {
        console.log('Error creating test data');
        return done();
      }
      if (docs.length === coiffeurs.length) {
        savedCoiffeurs = docs;
        console.log('Data inserted successfully');
        done();
      }
    });
  });

  it('should list all coiffeurs on /coiffeurs GET', function(done) {
    chai.request(serverUri)
      .get(routeBuilder('coiffeurs'))
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });

  it('should list one coiffeur on /coiffeurs/1 GET', function(done) {
    // console.log(savedCoiffeurs[3]);
    chai.request(serverUri)
      .get(routeBuilder('coiffeurs') + `/${savedCoiffeurs[3]._id}`)
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });

  it('should create one coiffeur on /coiffeurs POST', function(done) {
    chai.request(serverUri)
      .post(routeBuilder('coiffeurs'))
      .send(factory.build())
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        done();
      });
  });

  after(function(done) {
    Coiffeur.remove({}, function(err, docs) {
      if (err) {
        console.error('Error deleting coiffeur data');
        return done();
      }
      done();
    });
  });
});
