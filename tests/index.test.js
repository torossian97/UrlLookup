const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const service = require('../src/service');

chai.use(chaiHttp)

console.log(service.port)

// Test that the service is running on the proper port.
describe('Service', ()=>{
    it('Service should be running on proper port.', async()=>{
        chai.expect(service.port).to.equal(config.get('port'))
    })
});

// Test the GET route.
describe('/GET', () => {
    it('Service should successfully GET 200 status', (done) => {
      chai.request(service)
          .get('/urlStatus/1')
          .end((err, res) => {
              chai.expect(res.status).to.equal(200);
            done();
          });
    });
});