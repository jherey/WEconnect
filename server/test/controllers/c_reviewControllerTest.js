import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

let loginToken;

describe('/GET REQUESTS', () => {
	before((done) => {
		const userDetails = {
			username: 'jherey',
			password: 'jeremiaholufayo'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				loginToken = res.body.token;
				done();
			});
	});

	describe('', () => {
		before((done) => {
			const business = {
				busname: 'shoprite',
				busimage: 'shoprite.jpg',
				category: 'Sales',
				website: 'www.shoprite.com',
				email: 'shoprite@gmail.com',
				location: 'Nigeria'
			};
			chai.request(app)
				.post('/api/v1/businesses')
				.set('Authorization', loginToken)
				.send(business)
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(201);
					done();
				});
		});

		it('it should not add a review for a business that doesn\'t exist', (done) => {
			//	HTTP POST -> DON'T ADD A REVIEW FOR A BUSINESS
			const review = {
				userId: 1,
				review: 'good company, I like them'
			};
			chai.request(app)
				.post('/api/v1/businesses/11/reviews')
				.set('Authorization', loginToken)
				.send(review)
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(404);
					done();
				});
		});

		it('it should not add a review for a business if token unmatch', (done) => {
			//	HTTP POST -> DON'T ADD A REVIEW FOR A BUSINESS
			const wrongToken = `${loginToken}gftsg`;
			const review = {
				userId: 1,
				review: 'good company, I like them'
			};
			chai.request(app)
				.post('/api/v1/businesses/11/reviews')
				.set('Authorization', wrongToken)
				.send(review)
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(403);
					done();
				});
		});

		it('it should add a review for a business', (done) => {
			//	HTTP POST -> ADD A REVIEW FOR A BUSINESS
			const review = {
				userId: 1,
				review: 'good company, I like them'
			};
			chai.request(app)
				.post('/api/v1/businesses/2/reviews')
				.set('Authorization', loginToken)
				.send(review)
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(201);
					done();
				});
		});

		it('it should not GET reviews for a business that doesn\'t exist', (done) => {
			//	HTTP GET -> NO REVIEWS FOR WRONG BUSINESS
			chai.request(app)
				.get('/api/v1/businesses/8/reviews')
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(404);
					done();
				});
		});

		it('it should GET all reviews for a business', (done) => {
			//	HTTP GET -> RETURN ALL REVIEWS FOR A BUSINESS
			chai.request(app)
				.get('/api/v1/businesses/2/reviews')
				.end((err, res) => {
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.property('message');
					expect(res.status).to.equal(200);
					done();
				});
		});
	});
});
