import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

/*
  * Test the /GET requests
  */
describe('/GET REQUESTS', () => {
	it('it should GET all registered users', (done) => {
		//	HTTP POST -> REGISTER A NEW USER
		chai.request(app)
			.get('/api/v1/auth/')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('users');
				expect(res.status).to.equal(200);
				done();
			});
	});
});

/*
  * Test the /POST requests
  */
describe('/POST REQUESTS', () => {
	it('it should not register a user', (done) => {
		//	HTTP POST -> DONT REGISTER A NEW USER
		const userDetails = {
			username: 'Seyih',
			password: 'olufayo'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Email is not valid');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should register a new user', (done) => {
		//	HTTP POST -> REGISTER A NEW USER
		const userDetails = {
			username: 'Seyih',
			email: 'jade@gmail.com',
			password: 'olufayo'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('User registered successfully');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('it should not login a user', (done) => {
		//	HTTP POST -> DON'T LOGIN A USER
		const userDetails = {
			email: 'jerry@gmail.com'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Password field is empty');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should not login a user', (done) => {
		//	HTTP POST -> DON'T LOGIN A USER
		const userDetails = {
			email: 'jerry@gmail.com',
			password: 'jerry1'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Error logining in');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should login a user', (done) => {
		//	HTTP POST -> LOGIN A USER
		const userDetails = {
			email: 'jerry@gmail.com',
			password: 'jerry'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Success');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(200);
				done();
			});
	});
});
