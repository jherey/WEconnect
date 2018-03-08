import chai from 'chai';
import chaiHttp from 'chai-http';
import spies from 'chai-spies';
// import expressValidator from 'express-validator';
import middleware from '../../middleware/userValidator';

chai.use(chaiHttp);
chai.use(spies);
// chai.use(expressValidator);
const { expect } = chai;
const signup = middleware.userSignUp;
const login = middleware.userLogin;

/*
  * Test SIGNUP
  */
describe('signup tests', () => {
	it('should return a function()', () => {
		expect(signup).to.be.a('function');
	});

	it('should accept three arguments', () => {
		expect(signup.length).to.equal(3);
	});

	// it('should call next() once', () => {
	// 	const spy = chai.spy(signup);
	// 	signup('jerry', 'jerry@gmail.com', spy);
	// 	expect(spy).to.have.been.called();
	// });
});

/*
  * Test LOGIN
  */
describe('my middleware', () => {
	describe('login tests', () => {
		it('should return a function()', () => {
			expect(login).to.be.a('function');
		});

		it('should accept three arguments', () => {
			expect(login.length).to.equal(3);
		});
	});
});
