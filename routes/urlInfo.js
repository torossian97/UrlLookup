var express = require('express');
var UrlValidator = require('../src/urlValidator');
var router = express.Router();

// GET urlInfo.
router.get('/1/:hostname', function(req, res, next) {
  try {
    let urlValidator = new UrlValidator(req.params.hostname);
    res.send({url: urlValidator.url});
  } catch(e) {
    res.status(e.error).send({message: e.message}); 
  }
});

module.exports = router;
