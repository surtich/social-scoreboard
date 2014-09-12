var assert = require('assert');
var scoreModel = require(__dirname + '/../../model/scores');

module.exports = function() {

	this.Given(/^a initial score$/, function(callback) {
		this.score = scoreModel.create();
		assert(this.score, 'Score should exist');
		callback();
	});

	this.Then(/^the score of the "([^"]*)" team should be (\d+)$/, function(team, expectedScore, callback) {
		assert.equal(this.score.getTeamPoints(team), expectedScore, 'The ' + team + ' team score should be ' + expectedScore + ', but actually is ' + this.score.getTeamPoints(team));
		callback();
	});

};
