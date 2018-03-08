import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('api testing', () => {
	// Test for default route
	it('Should return 200 for the default route', (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('message');
				expect(res.status).to.equal(200);
				done();
			});
	});
});
