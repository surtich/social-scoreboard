module.exports = {
	server: {
		ip: process.env.IP || '0.0.0.0',
		port: process.env.PORT || 8000
	},
	db: {
		conn: "mongodb://127.0.0.1:27017/socialscoreboard"
	},
	ids: {
		google: {
			client_id:'380454543382-fqmk59spk85djt38boca89rub00nl44t.apps.googleusercontent.com',
			client_secret: 'VThoqqMepxiVtwwk54--B-M5',
			callback_url: 'http://localhost:8000/auth/oauth2callback',
			scopes: ['https://www.googleapis.com/auth/userinfo.profile']
		}
	},
	jwtSecret: 'very insecure secret'
};
