import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';
import businessValidator from '../../middleware/businessValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { createBusinessValidator } = businessValidator;

/*
  * Test REGISTER BUSINESS FUNCTION
  */
describe('MIDDLEWARE TESTS', () => {
  describe('Test register business function', () => {
    it('should return a function()', () => {
      expect(createBusinessValidator).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(createBusinessValidator.length).to.equal(3);
    });

    it('it should return no business found if location does not exist', (done) => {
      // HTTP GET -> BUSINESS DOESN'T EXIST
      chai.request(app)
        .get('/api/v1/businesses?location=usa&pageNum=1')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('No business found for this page');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('it should return all businesses with the inputed location', (done) => {
      // HTTP GET -> LOCATION EXIST
      chai.request(app)
        .get('/api/v1/businesses?location=nige&pageNum=1')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Businesses found!');
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should GET all business with the specified location', (done) => {
      // HTTP GET -> RETURN ALL BUSINESS WITH THE SPECIFIED LOCATION
      chai.request(app)
        .get('/api/v1/businesses?location=nigeria&pageNum=1')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Businesses found!');
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should return no business found if category does not exist', (done) => {
      // HTTP GET -> BUSINESS DOESN'T EXIST
      chai.request(app)
        .get('/api/v1/businesses?category=fashion&pageNum=1')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('No business found for this page');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('it should return all businesses with the inputed category', (done) => {
      // HTTP GET -> CATEGORY EXIST
      chai.request(app)
        .get('/api/v1/businesses?category=sal&pageNum=1')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Businesses found!');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
