var debug = require('debug')('social-scoreboard');
var express = require('express');

var app = express();

app.get('/test', function(req, res){
  res.send('Hello World');
	debug('/test called');
});

var port =  process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9001; 
var ip =  process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'; 

app.listen(port, ip, function () {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;