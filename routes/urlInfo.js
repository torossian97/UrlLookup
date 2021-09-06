var express = require('express');
var UrlValidator = require('../src/urlValidator');
var router = express.Router();

// GET urlInfo.
router.get('/1/:url', function(req, res, next) {
  let urlValidator = new UrlValidator(req.params.url);
  
  if(urlValidator.validURL()){
    res.send({url: req.params.url});
  } else {
    res.status(400).send({message: 'invalid URL.'});
  }
});

module.exports = router;
