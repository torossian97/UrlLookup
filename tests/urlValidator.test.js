const chai = require('chai');
const chaiHttp = require('chai-http');
const UrlValidator = require('../src/urlValidator');

const VALID_HOST = "http://google.com";
const EMPTY = "";
const INVALID_HOST_SPACE = "http:// google.com";
const INVALID_HOST_CHAR = "http@://google.com";
const INVALID_HOST_MISSING = "http://google";
//etc. not going to go completely in-depth on test-cases, you get the gist.

const VALID_PATH = "images";
const VALID_PATH_QUERY = "imghp?q=%22cisco%22";
const VALID_PATH_UNSAFE = "watermelon";
const INVALID_PATH = "@/&"

chai.use(chaiHttp)

//////////////// URL Validator //////////////////

// Test that the url Validator accepts a valid URL.
describe('URL Validator', ()=>{
    it('URL validator accepts a valid URL', async()=>{
        try {
            new UrlValidator(VALID_HOST);
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that the url Validator accepts a valid hostname and valid path.
describe('URL Validator', ()=>{
    it('URL validator accepts a valid hostname and path', async()=>{
        try {
            new UrlValidator(VALID_HOST, VALID_PATH);
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that the url Validator accepts a valid hostname and valid query path.
describe('URL Validator', ()=>{
    it('URL validator accepts a valid hostname and path with query', async()=>{
        try {
            new UrlValidator(VALID_HOST, VALID_PATH_QUERY);
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that the url Validator rejects an empty URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an empty URL', async()=>{
        try {
            new UrlValidator(EMPTY);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a space-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects a space-ridden URL', async()=>{
        try {
            new UrlValidator(INVALID_HOST_SPACE);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a invalid character-ridden URL.
describe('URL Validator', ()=>{
    it('URL Validator rejects an invalid character-ridden URL', async()=>{
        try {
            new UrlValidator(INVALID_HOST_CHAR);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a URL missing it's extension.
describe('URL Validator', ()=>{
    it("URL Validator rejects a URL missing it's extension", async()=>{
        try {
            new UrlValidator(INVALID_HOST_MISSING);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a URL comprised of valid hostname and invalid path.
describe('URL Validator', ()=>{
    it("URL Validator rejects a URL with valid hostname but improper path", async()=>{
        try {
            new UrlValidator(VALID_PATH, INVALID_PATH);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

// Test that the url Validator rejects a URL comprised of invalid hostname and valid path.
describe('URL Validator', ()=>{
    it("URL Validator rejects a URL with invalid hostname but proper path", async()=>{
        try {
            new UrlValidator(INVALID_HOST_MISSING, VALID_PATH);
            chai.assert.fail("Should have failed, this was an invalid URL.");
        } catch(e){
            // Expected.
        }
    })
});

//////////////// DB Fetch //////////////////

// Test that a valid URL returns the proper safety data.
describe('URL Validator', ()=>{
    it("URL Validator returns the proper safety data, SAFE", async()=>{
        try {
            let urlValidator = new UrlValidator(VALID_HOST, VALID_PATH);
            let response = urlValidator.dbFetch();
            chai.expect(response.safety).to.equal("SAFE");
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that a valid URL returns the proper safety data.
describe('URL Validator', ()=>{
    it("URL Validator returns the proper safety data, UNSAFE", async()=>{
        try {
            let urlValidator = new UrlValidator(VALID_HOST, VALID_PATH_UNSAFE);
            let response = urlValidator.dbFetch();
            chai.expect(response.safety).to.equal("UNSAFE");
        } catch(e){
            chai.assert.fail(e.message);
        }
    })
});

// Test that a valid URL returns the proper error when data not there.
describe('URL Validator', ()=>{
    it("URL Validator returns the proper error when data not there", async()=>{
        try {
            let urlValidator = new UrlValidator(VALID_HOST, "doesNotExist");
            let response = urlValidator.dbFetch();
            chai.assert.fail("Should have failed, this URL is not in the db.");
        } catch(e){
            // Expected.
        }
    })
});