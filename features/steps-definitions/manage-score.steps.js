var assert = require('assert');

module.exports = function() {
  
  this.When(/^"([^"]*)" team scores a basket of (.*) points?$/, function (offenseTeam, points, callback) {
    points = Number(points);
    this.score.scoreOneBasket(offenseTeam, points);
    callback();
  });
  
  this.When(/^I set the score of the "([^"]*)" team to (.*)$/, function (team, points, callback) {
    points = Number(points);
    this.score.setScoreTeam(team, points);
    callback();
  });

};
