module.exports = {
	server : {
		ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
		port: process.env.OPENSHIFT_NODEJS_PORT || 8080
	},
	db: {
		//conn: process.env.OPENSHIFT_MONGODB_DB_URL + '/socialscoreboard'
		conn: 'mongodb://user:123456@ds035260.mongolab.com:35260/socialscoreboard'
	},
	ids: {
		google: {
			client_id:'380454543382-fqmk59spk85djt38boca89rub00nl44t.apps.googleusercontent.com',
			client_secret: 'VThoqqMepxiVtwwk54--B-M5',
			callback_url: 'http://socialscoreboard-dawzayas.rhcloud.com/auth/oauth2callback',
			scopes: ['https://www.googleapis.com/auth/userinfo.profile']
		}
	},
	jwtSecret: 'very insecure secret'
};