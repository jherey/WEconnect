import chai from 'chai';
import chaiHttp from 'chai-http';
import middleware from '../../middleware/businessValidator';

chai.use(chaiHttp);
const { expect } = chai;
const register = middleware.registerBusiness;
const location = middleware.queryLocation;

/*
  * Test REGISTER BUSINESS FUNCTION
  */
describe('MIDDLEWARE TESTS', () => {
	describe('Test register business function', () => {
		it('should return a function()', () => {
			expect(register).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(register.length).to.equal(3);
		});
	});

	/*
		* Test LOGIN
		*/
	describe('login tests', () => {
		it('should return a function()', () => {
			expect(location).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(location.length).to.equal(3);
		});
	});
});
