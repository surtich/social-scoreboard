var jwtSecret = require('../util/config').jwtSecret;
var debug = require('debug')('social-scoreboard-sec');
var jwt = require('jsonwebtoken');

/**
 * Check if the token user exists, in other case FORBIDDEN
 */
function ensureAuthenticated(req, res, next) {


	var reqAuth = req.headers.authorization;

	if (!reqAuth) {
		debug('No authorization header found');
		res.send(401); // Unauthorized
		return;
	}

	var token = reqAuth.replace(/^\s*Bearer\s*/, '');

	jwt.verify(token, jwtSecret, function(err, decode) {

		if (err) {
			debug('Decode token error: ' + err);
			return res.send(500);
		}
		req.user = decode.profile;
		req.token = token;
		next(null);
	});

}

module = module.exports = ensureAuthenticated;