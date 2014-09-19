var token = require('../../util/config').token;

module.exports = function() {
	this.World = function World(callback) {
		this.token = token;
		callback();
	};
};