
process.env.NODE_ENV = 'test';
const config = require('../../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const routeBuilder = require('../../routes/routeBuilder');
const should = chai.should();

chai.use(chaiHttp);
const serverUri = `${config.api.url}:${config.port}`;
console.log(`Server Uri: ${serverUri}`);

describe('Coiffeurs', function() {
  it('should list all coiffeurs on /coiffeurs GET', function(done) {
    chai.request(serverUri)
      .get(routeBuilder('coiffeurs'))
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });
});
