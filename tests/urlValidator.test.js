const chai = require('chai');
const chaiHttp = require('chai-http');
const UrlValidator = require('../src/urlValidator');

const validUrl = "http://google.com";
const invalidUrl_empty = "";
const invalidUrl_space = "http:// google.com";
const invalidUrl_char = "http@://google.com";
const invalidUrl_missing = "http@://google";
//etc. not going to go completely in-depth on test-cases, you get the gist.

chai.use(chaiHttp)

//////////////// URL Validator //////////////////

// Test that the url Validator accepts a valid URL.
describe('URL Validator', ()=>{
    it('URL validator accepts a valid URL', async()=>{
        var urlValidator = new UrlValidator(validUrl);
        chai.expect(urlValidator.validURL()).to.equal(true)
    })
});

// Test that the url Validator rejects an empty URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an empty URL', async()=>{
        var urlValidator = new UrlValidator(invalidUrl_empty);
        chai.expect(urlValidator.validURL()).to.equal(false)
    })
});

// Test that the url Validator rejects a space-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects a space-ridden URL', async()=>{
        var urlValidator = new UrlValidator(invalidUrl_space);
        chai.expect(urlValidator.validURL()).to.equal(false)
    })
});

// Test that the url Validator rejects a invalid character-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an invalid character-ridden URL', async()=>{
        var urlValidator = new UrlValidator(invalidUrl_char);
        chai.expect(urlValidator.validURL()).to.equal(false)
    })
});

// Test that the url Validator rejects a URL missing it's extension.
describe('URL Validator', ()=>{
    it("URL Validator rejects a URL missing it's extension", async()=>{
        var urlValidator = new UrlValidator(invalidUrl_missing);
        chai.expect(urlValidator.validURL()).to.equal(false)
    })
});