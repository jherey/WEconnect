import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

let authToken;
let authToken2;

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
        expect(res.body.errors[0]).to.eql('Passwords do not match');
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

  it('it should register a new user', (done) => {
    // HTTP POST -> REGISTER A NEW USER
    const userDetails = {
      firstname: 'olufayo',
      username: 'olufayo',
      password: 'jeremiaholufayo',
      confirmPassword: 'jeremiaholufayo',
      lastname: 'olufayo',
      email: 'olufayo@gmail.com',
      profilepic: 'olufayo.jpg',
      sex: 'male'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Signed up successfully');
        expect(res.status).to.equal(201);
        authToken2 = res.body.token;
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
        expect(res.body.errors[0]).to.eql('Username/Password Incorrect');
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
        authToken = res.body.token;
        done();
      });
  });

  it('should not get a user that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/v1/auth/5')
      .end((err, res) => {
        expect(res.body.message).to.eql('No User Found!');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should get a user that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/v1/auth/1')
      .end((err, res) => {
        expect(res.body.message).to.eql('User Found');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should not update user details if user is not logged in', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/v1/auth/1')
      .send({
        firstname: 'jeremiah',
        username: 'jherey',
        password: 'jeremiaholufayo',
        confirmPassword: 'jeremiaholufayo',
        lastname: 'ologun',
        email: 'jeremiah@gmail.com',
        sex: 'female'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not update user details if user has wrong token', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    const wrongToken = `${authToken}gftsg`;
    chai.request(app)
      .put('/api/v1/auth/1')
      .set('Authorization', wrongToken)
      .send({
        firstname: 'jeremiah',
        username: 'jherey',
        password: 'jeremiaholufayo',
        confirmPassword: 'jeremiaholufayo',
        lastname: 'ologun',
        email: 'jeremiah@gmail.com',
        profilepic: 'jeremiah.jpg',
        sex: 'female'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not update user details if user does not exist', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/v1/auth/5')
      .set('Authorization', authToken)
      .send({
        firstname: 'jeremiah',
        username: 'jherey',
        password: 'jeremiaholufayo',
        confirmPassword: 'jeremiaholufayo',
        lastname: 'ologun',
        email: 'jeremiah@gmail.com',
        profilepic: 'jeremiah.jpg',
        sex: 'female'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('User does not exist');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not update user details if different user tries to update details', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/v1/auth/1')
      .set('Authorization', authToken2)
      .send({
        firstname: 'jeremiah',
        username: 'jherey',
        password: 'jeremiaholufayo',
        confirmPassword: 'jeremiaholufayo',
        lastname: 'ologun',
        email: 'jeremiah@gmail.com',
        profilepic: 'jeremiah.jpg',
        sex: 'female'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Oops! You cannot update this user details');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should update user details', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/v1/auth/1')
      .set('Authorization', authToken)
      .send({
        firstname: 'jeremiah',
        username: 'jherey',
        password: 'jeremiaholufayo',
        confirmPassword: 'jeremiaholufayo',
        lastname: 'ologun',
        email: 'jeremiah@gmail.com',
        profilepic: 'jeremiah.jpg',
        sex: 'female'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('User Details Updated Successfully');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
