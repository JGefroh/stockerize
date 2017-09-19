var express = require('express');
var http = require('http');
var https = require('https');
var url = require('url');
var app = express();
var port = process.env.PORT || 8080;
var host;

app.use('/', express.static('public'));
app.get('/*', function (req, res, next) {
  next();
}, function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
var server = app.listen(port, function () {
  host = server.address().address;
  port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
