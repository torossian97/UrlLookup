const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const service = require('../src/service');

const VALID_HOST = "http://google.com";
const EMPTY = "";
const INVALID_HOST = "http:// google.com";

const VALID_PATH = "images";
const INVALID_PATH = "@/&"

chai.use(chaiHttp)

console.log(service.port)

//////////////// SERVER //////////////////

// Test that the service is running on the proper port.
describe('Service', ()=>{
    it('Service should be running on proper port', async()=>{
        chai.expect(service.port).to.equal(config.get('port'))
    })
});

//////////////// GET //////////////////

// Test the GET route with valid url payload.
describe('/GET', () => {
    it('Service should succeed with completed request', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(VALID_HOST) + '/' + encodeURIComponent(VALID_PATH))
          .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body.url).to.equal(VALID_HOST);
            done();
          });
    });
});

// Test the GET route with valid hostname and empty path.
describe('/GET', () => {
    it('Service should succeed with valid hostname and blank path', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(VALID_HOST) + '/' + encodeURIComponent(EMPTY))
          .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body.url).to.equal(VALID_HOST);
            done();
          });
    });
});

// Test the GET route with invalid (empty) url payload.
describe('/GET', () => {
    it('Service should fail with invalid (empty) hostname, 404', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(EMPTY))
          .end((err, res) => {
              chai.expect(res.status).to.equal(404);
            done();
          });
    });
});

// Test the GET route with invalid url payload.
describe('/GET', () => {
    it('Service should fail with invalid hostname and valid path, 400', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(INVALID_HOST) + '/' + encodeURIComponent(VALID_PATH))
          .end((err, res) => {
              chai.expect(res.status).to.equal(400);
            done();
          });
    });
});

// Test the GET route with a valid hostname and invalid path.
describe('/GET', () => {
    it('Service should fail with valid hostname and invalid path, 400', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(VALID_HOST) + '/' + encodeURIComponent(INVALID_PATH))
          .end((err, res) => {
              chai.expect(res.status).to.equal(400);
            done();
          });
    });
});