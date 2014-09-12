var express = require('express');
var router = express.Router();

var scores = {};
var numScores = 0;

/* ROUTES */
router.post('/', createScore);
router.put('/:scoreId', updateScore);
router.get('/:scoreId', getScore);
router.delete('/:scoreId', delScore);
router.get('/', getAll);
/* END ROUTES */

/* PARAMS */
router.param('scoreId', checkScoreExists);
/* END PARAMS */

function createScore(req, res) {
	var score = {
		_id: String(numScores),
		home: 0,
		guest: 0
	};
	
	scores[score._id] = score;
	numScores++;
  
	res.json(score);
}


function updateScore(req, res) {
	var newScore = {
		_id: req.params.scoreId,
		home: req.body.home,
		guest: req.body.guest
	};
	
	scores[req.params.scoreId] = newScore;
	
	res.json(newScore);
}

function delScore(req, res) {
	
	delete scores[req.params.scoreId];
	
	res.send('scored ' + req.params.scoreId + ' removed.');
}

function getScore(req, res) {
	res.json(req.score);
}

function getAll(req, res) {
	res.json(scores);
}

function checkScoreExists (req, res, next, scoreId) {
	if (scores[scoreId]) {
		req.score = scores[scoreId];
		next();
	} else {
		next(new Error(scoreId + ' not exists'));
	}
}

module.exports = router;
