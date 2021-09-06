var express = require('express');
var router = express.Router();

// GET urlInfo.
router.get('/1/:url', function(req, res, next) {
  if(validURL(req.params.url)){
    res.send({url: req.params.url});
  } else {
    res.status(400).send({message: 'invalid URL.'});
  }
});

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

module.exports = router;
