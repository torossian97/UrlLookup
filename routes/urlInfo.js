var express = require('express');
var UrlValidator = require('../src/urlValidator');
var router = express.Router();

// GET urlInfo with path hostname and path.
router.get('/1/:hostname/:path', function(req, res, next) {
  try {
    let urlValidator = new UrlValidator(req.params.hostname, req.params.path);
    res.send({url: req.params.hostname});
  } catch(e) {
    res.status(e.error).send({message: e.message}); 
  }
});

// GET urlInfo with just hostname (no path specified).
router.get('/1/:hostname', function(req, res, next) {
  try {
    let urlValidator = new UrlValidator(req.params.hostname);
    res.send({url: urlValidator.url});
  } catch(e) {
    res.status(e.error).send({message: e.message}); 
  }
});

module.exports = router;
