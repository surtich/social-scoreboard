var debug = require('debug')('social-scoreboard-io');
var socketioJwt = require('socketio-jwt');
var jwtSecret = require('../util/config').jwtSecret;
var jwt = require('jsonwebtoken');

module.exports = function(http) {
	var io = require('socket.io')(http);

	io.set('transports', ['websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling',
		'polling']);

	io.set('authorization', socketioJwt.authorize({
		secret: jwtSecret,
		handshake: true
	}));

	io.sockets.on('connection', function(socket) {
		var token = socket.handshake.query.token;

			debug('connected id[' + socket.conn.id + ']');
			

		socket.on('disconnect', function() {
			debug('disconnect id[' + socket.conn.id + ']');
		});

		//socket.on('event');
	});
	
	function decode(token, jwtSecret, callback) {
		return jwt.verify(token, jwtSecret, callback);
	}
	
	io.emitOthers = function(event, data, emitterId) {
		if (emitterId) {
			for (var idSocket in io.sockets.connected) {
				var socket = io.sockets.connected[idSocket];
				if (emitterId !== idSocket) {
					socket.emit(event, data);
				}
			}
		}
	};

	return io;

};