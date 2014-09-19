var assert = require('assert');
var app = require('../../server');
var request = require('supertest');

module.exports = function() {
	this.Given(/^a initial score$/, function(callback) {
		var self = this;
		request(app)
						.post('/score')
						.set('Authorization', 'Bearer ' + self.token)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							if (err) {
								return callback(err);
							}
							var score = res.body;
							self.scoreId = score._id;
							callback();
						});
	});

	this.Then(/^the score of the "([^"]*)" team should be (\d+)$/, function(team, expectedScore, callback) {
		var self = this;
		request(app)
						.get('/score/' + self.scoreId)
						.set('Authorization', 'Bearer ' + self.token)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							if (err) {
								return callback(err);
							}
							var score = res.body;
							
							assert.equal(score[team], expectedScore, 'The ' + team + ' team score should be ' + expectedScore + ', but actually is ' + score[team]);
							callback();
						});
	});
};
