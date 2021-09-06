const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const service = require('../src/service');

const validUrl = "http://google.com";
const invalidUrl_empty = "";
const invalidUrl = "http:// google.com";
//etc. not going to go completely in-depth on test-cases, you get the gist.

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
          .get('/urlInfo/1/' + encodeURIComponent(validUrl))
          .end((err, res) => {
              chai.expect(res.status).to.equal(200);
              chai.expect(res.body.url).to.equal(validUrl);
            done();
          });
    });
});

// Test the GET route with invalid (empty) url payload.
describe('/GET', () => {
    it('Service should fail with invalid (empty) URL, 404', (done) => {
      chai.request(service)
          .get('/urlInfo/1/' + encodeURIComponent(invalidUrl_empty))
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
          .get('/urlInfo/1/' + encodeURIComponent(invalidUrl))
          .end((err, res) => {
              chai.expect(res.status).to.equal(400);
            done();
          });
    });
});