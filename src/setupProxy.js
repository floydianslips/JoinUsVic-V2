const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('HELLO!!!!');
  app.use(proxy('/api', { target: 'http://localhost:3000/' }))
}