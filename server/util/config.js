var config;
if (process.env.CONFIG) {
	config = require('../config/' + process.env.CONFIG);
} else {
	config = require('../config/dev');
}

module.exports = config;
