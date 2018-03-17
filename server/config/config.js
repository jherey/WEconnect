require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 5432,
		secret_key: process.env.secretKey,
		dialect: 'postgres'
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 5432,
		secret_key: process.env.secretKey,
		dialect: 'postgres'
	},
	production: {
		environment: 'production'
	}
};
