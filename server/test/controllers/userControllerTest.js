import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

/*
  * Test the /POST requests
  */
describe('/POST REQUESTS', () => {
	it('it should POST register a user', (done) => {
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

	it('it should POST login a user', (done) => {
		//	HTTP POST -> LOGIN A NEW USER
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
