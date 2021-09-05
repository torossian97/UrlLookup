const express = require('express');
const debug = require('debug')('server:debug');
const config = require('config');

const app = express();

// Get proper port from config and start server
const listen = app.listen(config.get('port'), () => {
  debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
  console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});

module.exports = app;
module.exports.port = listen.address().port;