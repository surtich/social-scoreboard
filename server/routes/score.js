var express = require('express');
var router = express.Router();
var scoreManager = require('../manager/score');
var ensureAuth = require('../middleware/sec').ensureAuthenticated;
var ensureOwner = require('../middleware/sec').ensureOwner;
var debug = require('debug')('social-scoreboard-route-score');

function worker(io) {

	/* ROUTES */
	router.all('/*', ensureAuth);
	router.post('/', createScore);
	router.put('/:scoreId/basket', ensureOwner, scoreBasket);
	router.put('/:scoreId/set', ensureOwner, setScore);
  router.put('/:scoreId/state', ensureOwner, setState);
	router.get('/:scoreId', getScore);
	router.delete('/:scoreId', ensureOwner, delScore);
	router.get('/', getAll);
	/* END ROUTES */

	function createScore(req, res, next) {
		scoreManager.create(req.user.id, req.body, function(err, result) {
			if (err) {
				return next(err);
			}
			debug('score created[' + result._id + ']');
			res.json(result);
			io.emitOthers('scoreCreated', result, req.query.socketId);
		});
	}

	function getScore(req, res, next) {
		var scoreId = req.params.scoreId;
		scoreManager.getById(scoreId, function(err, score) {
			if (err) {
				return next(err);
			}
			
			if (score) {
				res.json(score);
			} else {
				next(new Error(new Error(scoreId + ' not exists')));
			}
		});
	}

	function getAll(req, res, next) {
		scoreManager.getAll(function(err, scores) {
			if (err) {
				return next(err);
			}
			res.json(scores);
		});
	}

	function delScore(req, res, next) {
		var scoreId = req.params.scoreId;
		scoreManager.delScore(req.params.scoreId, function(err, result) {
			if (err) {
				return next(err);
			}
			if (result === 0) {
				next(new Error(scoreId + ' not exists'));
			} else {
				debug('score destroyed[' + scoreId + ']');
				res.send('Score[' + scoreId + '] deleted');
				io.emitOthers('scoreDestroyed', scoreId, req.query.socketId);
			}
		});
	}

	function scoreBasket(req, res, next) {
		updateScore(scoreManager.scoreBasket, req, res, next);
	}

	function setScore(req, res, next) {
		updateScore(scoreManager.setScoreTeam, req, res, next);
	}

  function setState(req, res, next) {
		var scoreId = req.params.scoreId;
		var state = req.body.state;

		scoreManager.setScoreState(scoreId, state, function(err, newScore) {
			if (err) {
				return next(err);
			}
			if (!newScore) {
				next(new Error(new Error(scoreId + ' not exists')));
			} else {
				debug('change score state to ' + state + '[' + scoreId + ']');
				res.json(newScore);
				io.emitOthers('scoreSetState', newScore, req.query.socketId);
			}
		});
	}


	function updateScore(fn, req, res, next) {
		var scoreId = req.params.scoreId;
		var team = req.body.team;
		var points = req.body.points;

		fn(scoreId, team, points, function(err, newScore) {
			if (err) {
				return next(err);
			}
			if (!newScore) {
				next(new Error(new Error(scoreId + ' not exists')));
			} else {
				debug('score updated[' + scoreId + ']');
				res.json(newScore);
				io.emitOthers('scoreSetted', newScore, req.query.socketId);
			}

		});
	}
	return router;
}

module.exports = worker;