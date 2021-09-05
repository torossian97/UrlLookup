var express = require('express');
var router = express.Router();

// GET urlInfo.
router.get('/1', function(req, res, next) {
  res.send('response');
});

module.exports = router;
