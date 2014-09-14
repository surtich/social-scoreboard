var scoreDao = require('../../dao/score');

var hooks = function() {
	this.Before(function(callback) {
		scoreDao.delAll(callback);
	});
	
	this.AfterFeatures(function(callback) {
		process.exit();
	});
};

module.exports = hooks;