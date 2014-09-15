module.exports = {
	server: {
		ip: process.env.IP || '0.0.0.0',
		port: process.env.PORT || 8000
	},
	db: {
		conn: 'mongodb://0.0.0.0:27017/socialscoreboard'
	}
};