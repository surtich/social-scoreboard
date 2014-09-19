var express = require('express');
var router = express.Router();
var ensureAuth = require('../middleware/sec').ensureAuthenticated;

function worker(io) {

	/* ROUTES */
	router.get('/profile', ensureAuth, getProfile);
	/* END ROUTES */

	function getProfile(req, res) {
		res.json(req.user);
	}	
	
	return router;
}

module.exports = worker;
