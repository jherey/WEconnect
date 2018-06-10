import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';
import userValidator from '../../middleware/userValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { userSignUp } = userValidator;
const { userLogin } = userValidator;

/*
  * Test SIGNUP
  */
describe('USER VALIDATOR TESTS', () => {
  describe('signup tests', () => {
    it('should return a function()', () => {
      expect(userSignUp).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(userSignUp.length).to.equal(3);
    });

  //   it('it should not register a user', (done) => {
  //     // HTTP POST -> DONT REGISTER A NEW USER
  //     const userDetails = {
  //       username: 'Seyih',
  //       password: 'olufayo',
  //       sex: 'male'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/signup')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Firstname is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

  //   it('it should not register a user', (done) => {
  //     // HTTP POST -> DONT REGISTER A NEW USER
  //     const userDetails = {
  //       firstname: 'Jeremiah',
  //       username: 'Seyih',
  //       password: 'olufayo',
  //       sex: 'male'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/signup')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Lastname is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

  //   it('it should not register a user', (done) => {
  //     // HTTP POST -> DONT REGISTER A NEW USER
  //     const userDetails = {
  //       firstname: 'Jeremiah',
  //       lastname: 'Oluwaseyi',
  //       sex: 'male',
  //       username: 'Seyih',
  //       password: 'olufayo'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/signup')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Email is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

  //   it('it should not register a user', (done) => {
  //     // HTTP POST -> DONT REGISTER A NEW USER
  //     const userDetails = {
  //       firstname: 'Jeremiah',
  //       lastname: 'Oluwaseyi',
  //       username: 'Seyih',
  //       email: 'olufayo@gmail.com'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/signup')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Password is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

  //   it('it should not register a user', (done) => {
  //     // HTTP POST -> DONT REGISTER A NEW USER
  //     const userDetails = {
  //       firstname: 'Jeremiah',
  //       lastname: 'Oluwaseyi',
  //       username: 'Seyih',
  //       password: 'olufayo',
  //       email: 'olufayo@gmail.com'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/signup')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Confirm password field is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });
  // });

  // /*
  //   * Test LOGIN
  // */
  // describe('login tests', () => {
  //   it('it should not login a user', (done) => {
  //     // HTTP POST -> DON'T LOGIN A USER
  //     const userDetails = {
  //       username: 'jherey'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Password is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

  //   it('it should not login a user', (done) => {
  //     // HTTP POST -> DON'T LOGIN A USER
  //     const userDetails = {
  //       password: 'jherey'
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send(userDetails)
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message')
  //           .eql('Username is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });

    it('should return a function()', () => {
      expect(userLogin).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(userLogin.length).to.equal(3);
    });
  });
});
