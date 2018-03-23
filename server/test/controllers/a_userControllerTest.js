import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../models';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

//	Users model
const { User } = models;

/*
  * Test the /POST requests
  */
describe('User', () => {
	before((done) => {
		User.sync({ force: true })
			.then(() => done());
	});

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
				expect(res.body).to.have.property('message');
				expect(res.body).to.have.property('error');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should register a new user', (done) => {
		//	HTTP POST -> REGISTER A NEW USER
		const userDetails = {
			firstname: 'jeremiah',
			username: 'jherey',
			password: 'jeremiaholufayo',
			lastname: 'ologun',
			email: 'jeremiah@gmail.com',
			profilepic: 'jeremiah.jpg',
			sex: 'male'
		};
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Signed up successfully');
				expect(res.status).to.equal(201);
				done();
			});
	});

	it('it should not login a user', (done) => {
		//	HTTP POST -> DON'T LOGIN A USER
		const userDetails = {
			username: 'jherey'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Password field is empty');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should not login a user', (done) => {
		//	HTTP POST -> DON'T LOGIN A USER
		const userDetails = {
			username: 'jherey',
			password: 'jeremiah'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('Username/Password Incorrect');
				expect(res.status).to.equal(400);
				done();
			});
	});

	it('it should login a user', (done) => {
		//	HTTP POST -> LOGIN A USER
		const userDetails = {
			username: 'jherey',
			password: 'jeremiaholufayo'
		};
		chai.request(app)
			.post('/api/v1/auth/login')
			.send(userDetails)
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message').eql('User logged in successfully');
				expect(res.body).to.have.property('token');
				expect(res.status).to.equal(200);
				done();
			});
	});
});