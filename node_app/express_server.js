var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var server = express();

server.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

server.use(express.static(path.join(__dirname, '../')));

server.use(bodyParser.urlencoded({
  extended: true
  }));
  
server.use(bodyParser.json());

var port = 5000;
server.listen(port, function () {  
  console.log("Server listening on port " + port);
});

module.exports = server;