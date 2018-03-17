require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 5432,
		secret_key: process.env.secretKey,
		dialect: process.env.DB_DIALECT
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		port: 5432,
		secret_key: process.env.secretKey,
		dialect: process.env.DB_DIALECT
	},
	production: {
		environment: 'production'
	}
};
