const express = require('express');
const debug = require('debug')('server:debug');
const config = require('config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(config.get('port'), () => {
  debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
  console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});
//# sourceMappingURL=service.js.map