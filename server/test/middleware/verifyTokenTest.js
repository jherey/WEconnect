import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';
import verifyToken from '../../middleware/verifyToken';

chai.use(chaiHttp);
const { expect } = chai;
const { tokenVerification } = verifyToken;

/*
  * Test SIGNUP
  */
describe('PARAMS CHECKER TESTS', () => {
  it('should return a function()', () => {
    expect(tokenVerification).to.be.a('function');
  });

  it('should accept three arguments', () => {
    expect(tokenVerification.length).to.equal(3);
  });

  it('it should allow only numbers as id for users', (done) => {
    chai.request(app)
      .get('/api/v1/auth/as')
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message')
          .eql('ID can only be a number');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should allow only numbers as id for businesses', (done) => {
    chai.request(app)
      .delete('/api/v1/businesses/as')
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message')
          .eql('ID can only be a number');
        expect(res.status).to.equal(400);
        done();
      });
  });
});
