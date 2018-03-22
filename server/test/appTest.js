import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('api testing', () => {
	// Test for default route
	it('Should return 200 for the default route', (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				done();
			});
	});
});
