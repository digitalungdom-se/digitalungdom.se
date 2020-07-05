import express = require('express');
import path = require('path');
import proxy = require('express-http-proxy');
const port = 6973;

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '..', '..', 'build')));

if (process.env['NODE_ENV'] === 'development') {
  app.use(
    '/api',
    proxy('https://devapi.digitalungdom.se', {
      proxyReqPathResolver: function (req) {
        return '/api' + req.url;
      },
    }),
  );
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
