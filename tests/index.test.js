const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const service = require('../src/service');

const VALID_HOST = "http://google.com";
const INVALID_HOST_EMPTY = "";
const INVALID_HOST = "http:// google.com";

chai.use(chaiHttp)

console.log(service.port)

//////////////// SERVER //////////////////

// Test that the service is running on the proper port.
describe('Service', ()=>{
    it('Service should be running on proper port.', async()=>{
        chai.expect(service.port).to.equal(config.get('port'))
    })
});

//////////////// GET //////////////////

// Test the GET route with valid url payload.
describe('/GET', () => {
    it('Service should successfully GET 200 status', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(VALID_HOST))
          .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body.url).to.equal(VALID_HOST);
            done();
          });
    });
});

// Test the GET route with invalid (empty) url payload.
describe('/GET', () => {
    it('Service should fail with invalid (empty) URL, 404', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(INVALID_HOST_EMPTY))
          .end((err, res) => {
              chai.expect(res.status).to.equal(404);
            done();
          });
    });
});

// Test the GET route with invalid url payload.
describe('/GET', () => {
    it('Service should fail with invalid URL, 400', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(INVALID_HOST))
          .end((err, res) => {
              chai.expect(res.status).to.equal(400);
            done();
          });
    });
});