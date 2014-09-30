var scoreManager = require('../manager/score');
function emits(io) {
	return function(socket) {

		socket.on('newScore', function() {
			scoreManager.create(function(err, result) {
				if (err) {
					return socket.emit('err', err);
				}
				io.emit('scoreCreated', result);
			});
		});

		socket.on('destroyScore', function(scoreId) {
			scoreManager.delScore(scoreId, function(err, result) {
				if (result === 0) {
					socket.emit('err', scoreId + ' not exists');
				} else {
					io.emit('scoreDestroyed', scoreId);
				}
			});
		});

		socket.on('setScore', function(data) {
			scoreManager.setScoreTeam(data.scoreId, data.team, data.points, function(err, newScore) {
				if (err) {
					return socket.emit('err', err);
				}
				if (!newScore) {
					return socket.emit('err', data.scoreId + ' not exists');
				} else {
					socket.broadcast.emit('scoreSetted', newScore);
				}

			});
		});
	};
}

module.exports = emits;