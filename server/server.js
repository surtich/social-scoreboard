var debug = require('debug')('social-scoreboard');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
				message: err.message,
				error: err
		});
});


var port =  process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9001; 
var ip =  process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'; 

app.listen(port, ip, function () {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;