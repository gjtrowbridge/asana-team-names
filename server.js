var express = require('express');
var api = require('./api');
var server = express();

server.use('/api', api(express));
server.use(express.static(__dirname + '/public'));

var port = process.env.port || 8080;
server.listen(port, function() {
  console.log('Server listening on port ' + port);
});
