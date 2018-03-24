import chai from 'chai';
import chaiHttp from 'chai-http';
import userValidator from '../../middleware/userValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { userSignUp } = userValidator;
const { userLogin } = userValidator;

/*
  * Test SIGNUP
  */
describe('MIDDLEWARE TESTS', () => {
	describe('signup tests', () => {
		it('should return a function()', () => {
			expect(userSignUp).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(userSignUp.length).to.equal(3);
		});
	});

	/*
		* Test LOGIN
		*/
	describe('login tests', () => {
		it('should return a function()', () => {
			expect(userLogin).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(userLogin.length).to.equal(3);
		});
	});
});
