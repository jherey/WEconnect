import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

/*
  * Test the /GET requests
  */
describe('/GET REQUESTS', () => {
	it('it should not GET any business', (done) => {
		//	HTTP GET -> RETURN NO BUSINESS
		chai.request(app)
			.get('/api/v1/business')
			.end((err, res) => {
				expect(res.body)
					.to.be.an.instanceof(Object)
					.and.to.have.property('message');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should GET all the businesses', (done) => {
		//	HTTP GET -> RETURN ALL BUSINESSES
		chai.request(app)
			.get('/api/v1/businesses')
			.end((err, res) => {
				expect('Content-Type', /json/);
				expect(res.body)
					.to.be.an.instanceof(Object)
					.and.to.have.property('business')
					.to.be.an.instanceof(Array);
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should not GET a business', (done) => {
		//	HTTP GET -> RETURN ERROR
		chai.request(app)
			.get('/api/v1/businesses/6')
			.end((err, res) => {
				expect(res.body).to.be.an.instanceof(Object);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should GET a business', (done) => {
		//	HTTP GET -> RETURN A BUSINESS
		chai.request(app)
			.get('/api/v1/businesses/1')
			.end((err, res) => {
				expect(res.body)
					.to.be.an.instanceof(Object)
					.and.to.have.property('business')
					.to.be.an.instanceof(Object)
					.and.to.have.property('id', 1);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should not GET reviews for a business that doesn\'t exist', (done) => {
		//	HTTP GET -> NO REVIEWS FOR WRONG BUSINESS
		chai.request(app)
			.get('/api/v1/businesses/6/reviews')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should GET all reviews for a business', (done) => {
		//	HTTP GET -> RETURN ALL REVIEWS FOR A BUSINESS
		chai.request(app)
			.get('/api/v1/businesses/1/reviews')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('Reviews');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should return an error if location is wrong', (done) => {
		//	HTTP GET -> RETURN EMPTY ARRAY, LOCATION DOESN'T EXIST
		chai.request(app)
			.get('/api/v1/businesses?location=lago')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should GET all business with the specified location', (done) => {
		//	HTTP GET -> RETURN ALL BUSINESS WITH THE SPECIFIED LOCATION
		chai.request(app)
			.get('/api/v1/businesses?location=lagos')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should return an error if category is wrong', (done) => {
		//	HTTP GET -> RETURN EMPTY ARRAY,CATEGORY DOESN'T EXIST
		chai.request(app)
			.get('/api/v1/businesses?category=ict')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should GET all business with the specified category', (done) => {
		//	HTTP GET -> RETURN ALL BUSINESS WITH THE SPECIFIED CATEGORY
		chai.request(app)
			.get('/api/v1/businesses?category=sports')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.status).to.equal(200);
				done();
			});
	});
});

/*
  * Test the /POST requests
  */
describe('/POST REQUESTS', () => {
	it('it should not register a new business', (done) => {
		//	HTTP POST -> DON'T REGISTER A BUSINESS
		const business = {
			name: 'seyi'
		};
		chai.request(app)
			.post('/api/v1/businesses')
			.send(business)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.not.equal(0);
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should register a new business', (done) => {
		//	HTTP POST -> REGISTER A BUSINESS
		const business = {
			name: 'seyi',
			address: '23, Akin Street, Lagos'
		};
		chai.request(app)
			.post('/api/v1/businesses')
			.send(business)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.not.equal(0);
				expect(res.body).to.have.property('message');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should not add a review for a business that doesn\'t exist', (done) => {
		//	HTTP POST -> DON'T ADD A REVIEW FOR A BUSINESS
		const review = {
			name: 'john',
			review: 'good company, I like them'
		};
		chai.request(app)
			.post('/api/v1/businesses/6/reviews')
			.send(review)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should add a review for a business', (done) => {
		//	HTTP POST -> ADD A REVIEW FOR A BUSINESS
		const review = {
			name: 'john',
			review: 'good company, I like them'
		};
		chai.request(app)
			.post('/api/v1/businesses/1/reviews')
			.send(review)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('business');
				expect(res.status).to.equal(200);
				done();
			});
	});
});

/*
  * Test the /PUT requests
  */
describe('/PUT REQUESTS', () => {
	it('it should not update a business that doesn\'t exist', (done) => {
		//	HTTP PUT -> DON'T UPDATE A BUSINESS
		chai.request(app)
			.put('/api/v1/businesses/6')
			.send({
				name: 'jerry@gmail.com',
				address: 'jerry',
				website: 'www.fav.com'
			})
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should update a business', (done) => {
		//	HTTP PUT -> UPDATE A BUSINESS
		chai.request(app)
			.put('/api/v1/businesses/1')
			.send({
				name: 'jerry@gmail.com',
				address: 'jerry',
				website: 'www.fav.com'
			})
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.status).to.equal(200);
				done();
			});
	});
});

/*
  * Test the /DELETE route
  */
describe('/DELETE REQUESTS', () => {
	it('it should not delete a business', (done) => {
		//	HTTP DELETE -> DON'T REMOVE A BUSINESS
		chai.request(app)
			.delete('/api/v1/businesses/6')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Business cannot be deleted because it does not exist');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should update a business', (done) => {
		//	HTTP DELETE -> REMOVE A BUSINESS
		chai.request(app)
			.delete('/api/v1/businesses/1')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Business successfully deleted');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(200);
				done();
			});
	});
});

