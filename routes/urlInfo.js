var express = require('express');
var UrlValidator = require('../src/urlValidator');
var router = express.Router();

// GET urlInfo with path hostname and path.
router.get('/1/:hostname/:path', function(req, res, next) {
  try {
    let urlValidator = new UrlValidator(req.params.hostname, req.params.path);
    urlValidator.getUrlInfo(req,res);
  } catch(e) {
    res.status(e.error).send({message: e.message}); 
  }
});

// GET urlInfo with just hostname (no path specified).
router.get('/1/:hostname', function(req, res, next) {
  try {
    let urlValidator = new UrlValidator(req.params.hostname);
    urlValidator.getUrlInfo(req,res);
  } catch(e) {
    res.status(e.error).send({message: e.message}); 
  }
});

module.exports = router;
