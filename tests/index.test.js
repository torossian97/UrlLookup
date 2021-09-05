const chai = require('chai');
const config = require('config');
const service = require('../src/service');
console.log(service.port)

describe('Service', ()=>{
    it('Service should be running on proper port.', async()=>{
        chai.expect(service.port).to.equal(config.get('port'))
    })
});