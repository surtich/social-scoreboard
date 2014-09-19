var assert = require('assert');
var app = require('../../server');
var request = require('supertest');

module.exports = function() {

	this.When(/^"([^"]*)" team scores a basket of (.*) points?$/, function(offenseTeam, points, callback) {
		points = Number(points);
		var self = this;
		request(app)
						.put('/score/' + self.scoreId + '/basket')
						.set('Authorization', 'Bearer ' + self.token)
						.send({'team': offenseTeam, 'points': points})
						.end(function(err, res) {
							callback();
						});
	});

	this.When(/^I set the score of the "([^"]*)" team to (.*)$/, function(team, points, callback) {
		points = Number(points);
		var self = this;
		request(app)
						.put('/score/' + self.scoreId + '/set')
						.set('Authorization', 'Bearer ' + self.token)
						.send({'team': team, 'points': points})
						.end(function(err, res) {
							callback();
						});
	});

};
