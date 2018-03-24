import chai from 'chai';
import chaiHttp from 'chai-http';
import businessValidator from '../../middleware/businessValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { createBusinessValidator } = businessValidator;
const { query } = businessValidator;

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
	});

	/*
		* Test QUERY METHOD
		*/
	describe('method tests', () => {
		it('should return a function()', () => {
			expect(query).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(query.length).to.equal(3);
		});
	});
});
