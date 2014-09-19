var debug = require('debug')('social-scoreboard');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');

var config = require('./util/config');

var app = express();
var http = require('http').Server(app);

var io = require('./util/socket.io')(http);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});

debug('CORS enabled');

// Custom error handler
app.use(function(err, req, res, next) {
	if (err) {

		if (!err.statusCode || err.statusCode === 500) {
			if (process.env.CONFIG !== 'cucumber') {
				console.error(err);
			}
		}

		var errorJson = {
			err: err.err || err.code || 'server_error',
			des: err.des || err.message || err.name || 'unknown'
		};

		res.json(err.statusCode || 500, errorJson);

	} else {
		next();
	}
});

//
// Routes
//

var basePath = path.join(__dirname, '/routes/');
fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition)(io));
});

var ip = config.server.ip;
var port = config.server.port;

http.listen(port, ip, function() {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;