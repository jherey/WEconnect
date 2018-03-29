# WeConnect

[![Build Status](https://travis-ci.org/jherey/WeConnect.svg?branch=develop)](https://travis-ci.org/jherey/WeConnect)
[![Coverage Status](https://coveralls.io/repos/github/jherey/WeConnect/badge.svg?branch=develop)](https://coveralls.io/github/jherey/WeConnect?branch=develop)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/jherey/WeConnect)


WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

## Table of Contents
1. <a href="#tech-stack-used">Tech Stack Used</a>
2. <a href="#application-features">Application Features</a>
3. <a href="#how-to-use">How To Use</a>
4. <a href="#author">Author</a>
5. <a href="#license">License</a>


## Tech Stack Used

- [Bootstrap](https://getbootstrap.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Express-Validator](https://www.npmjs.com/package/express-validator)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](http://docs.sequelizejs.com/)

WeConnect is hosted on gh-pages and API Documentation uses Swagger on Heroku

- [Github Pages](https://jherey.github.io/WeConnect/index.html)
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2153206)
- [API Documentation](https://weconnect-server.herokuapp.com)

## Application Features

* Register a business
* Update a business profile
* Remove a business
* Get all the reviews for a business
* Get all the businesses
* Get the details of a business
* Filter businesses by location
* Filter businesses by category
* Post a review for a business

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/jherey/WeConnect.git

# Go into the repository
$ cd WeConnect

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the .env.example file

# Run sequelize migrate command
$ node_modules/.bin/sequelize db:migrate

# Run the app
$ npm start
```

## API endpoints
```
POST Request -> localhost:8000/api/v1/auth/signup
POST Request -> localhost:8000/api/v1/auth/login
POST Request -> localhost:8000/api/v1/businesses
GET Request ->  localhost:8000/api/v1/businesses
GET Request ->  localhost:8000/api/v1/businesses/:businessId
PUT Request ->  localhost:8000/api/v1/businesses/:businessId        
DELETE Request -> localhost:8000/api/v1/businesses/:businessId
GET Request -> localhost:8000/api/v1/businesses?location=location
GET Request -> localhost:8000/api/v1/businesses?category=category
POST Request -> localhost:8000/api/v1/businesses/:businessId/reviews
GET Request -> localhost:8000/api/v1/businesses/:businessId/reviews
```

## Tests

* To run tests, navigate to the project's root directory
* After installation, run `npm run test`

## Author

Jeremiah Olufayo


## License

ISC

---
