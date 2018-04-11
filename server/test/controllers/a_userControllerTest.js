import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

/*
  * Test the /POST requests
  */
describe('User', () => {
  it('it should not register a user', (done) => {
    // HTTP POST -> DONT REGISTER A NEW USER
    const userDetails = {
      firstname: 'Jeremiah',
      lastname: 'Oluwaseyi',
      username: 'Seyih',
      password: 'olufayo',
      confirmPassword: 'oluf',
      email: 'olufayo@gmail.com',
      sex: 'male'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Passwords do not match');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should register a new user', (done) => {
    // HTTP POST -> REGISTER A NEW USER
    const userDetails = {
      firstname: 'jeremiah',
      username: 'jherey',
      password: 'jeremiaholufayo',
      confirmPassword: 'jeremiaholufayo',
      lastname: 'ologun',
      email: 'jeremiah@gmail.com',
      profilepic: 'jeremiah.jpg',
      sex: 'male'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Signed up successfully');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('it should not login a user', (done) => {
    // HTTP POST -> DON'T LOGIN A USER
    const userDetails = {
      username: 'jherey'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Password field is empty');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not login a user', (done) => {
    // HTTP POST -> DON'T LOGIN A USER
    const userDetails = {
      password: 'jherey'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Username field is empty');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not login a user', (done) => {
    // HTTP POST -> DON'T LOGIN A USER
    const userDetails = {
      username: 'jherey',
      password: 'jeremiah'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message')
          .eql('Username/Password Incorrect');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should login a user', (done) => {
    // HTTP POST -> LOGIN A USER
    const userDetails = {
      username: 'jherey',
      password: 'jeremiaholufayo'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message')
          .eql('User logged in successfully');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
