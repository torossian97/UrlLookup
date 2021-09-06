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
        try {
            new UrlValidator(validUrl);
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that the url Validator rejects an empty URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an empty URL', async()=>{
        try {
            new UrlValidator(invalidUrl_empty);
            chai.assert.fail("Should have failed,l this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a space-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects a space-ridden URL', async()=>{
        try {
            new UrlValidator(invalidUrl_space);
            chai.assert.fail("Should have failed,l this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a invalid character-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an invalid character-ridden URL', async()=>{
        try {
            new UrlValidator(invalidUrl_char);
            chai.assert.fail("Should have failed,l this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a URL missing it's extension.
describe('URL Validator', ()=>{
    it("URL Validator rejects a URL missing it's extension", async()=>{
        try {
            new UrlValidator(invalidUrl_missing);
            chai.assert.fail("Should have failed,l this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});