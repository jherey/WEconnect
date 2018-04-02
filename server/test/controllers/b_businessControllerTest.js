import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

let authToken;

describe('This test describes the business', () => {
  before((done) => {
    const userDetails = {
      username: 'jherey',
      password: 'jeremiaholufayo'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it('it should not register a new business', (done) => {
    // HTTP POST -> DON'T REGISTER A BUSINESS
    const business = {
      website: 'www.seyi.com',
      email: 'seyi@gmail.com',
      location: 'Nigeria',
      category: 'Fashion'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Business name is required');
        expect(res.body).to.have.property('error');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not register a new business', (done) => {
    // HTTP POST -> DON'T REGISTER A BUSINESS
    const business = {
      businessName: 'seyi',
      website: 'www.seyi.com',
      email: 'seyi@gmail.com',
      location: 'Nigeria'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Category is required');
        expect(res.body).to.have.property('error');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not register a new business', (done) => {
    // HTTP POST -> DON'T REGISTER A BUSINESS
    const business = {
      businessName: 'seyi',
      website: 'www.seyi.com',
      email: 'seyi@gmail.com',
      category: 'Sports'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Location is required');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not register a new business without headers', (done) => {
    // HTTP POST -> DON'T REGISTER A BUSINESS
    const business = {
      businessName: 'shoprite',
      businessImage: 'shoprite.jpg',
      category: 'Sales',
      website: 'www.shoprite.com',
      email: 'shoprite@gmail.com',
      location: 'Nigeria'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not register a new business with wrong headers', (done) => {
    const wrongToken = `${authToken}gftsg`;
    // HTTP POST -> DON'T REGISTER A BUSINESS
    const business = {
      businessName: 'shoprite',
      businessImage: 'shoprite.jpg',
      category: 'Sales',
      website: 'www.shoprite.com',
      email: 'shoprite@gmail.com',
      location: 'Nigeria'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', wrongToken)
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should register a new business', (done) => {
    // HTTP POST -> REGISTER A BUSINESS
    const business = {
      businessName: 'shoprite',
      businessImage: 'shoprite.jpg',
      category: 'Sales',
      website: 'www.shoprite.com',
      email: 'shoprite@gmail.com',
      location: 'Nigeria'
    };
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', authToken)
      .send(business)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Business created successfully');
        expect(res.status).to.equal(201);
        done();
      });
  });

  /*
    * Test the /GET requests
  */
  describe('/GET REQUESTS', () => {
    it('it should GET all the businesses', (done) => {
      // HTTP GET -> RETURN ALL BUSINESSES
      chai.request(app)
        .get('/api/v1/businesses')
        .end((err, res) => {
          expect(res.body)
            .to.be.an.instanceof(Object)
            .and.to.have.property('message')
            .eql('Businesses found!');
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should not GET a business', (done) => {
      // HTTP GET -> RETURN ERROR
      chai.request(app)
        .get('/api/v1/businesses/11')
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Business Not Found!');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('it should GET a business', (done) => {
      // HTTP GET -> RETURN A BUSINESS
      chai.request(app)
        .get('/api/v1/businesses/1')
        .end((err, res) => {
          expect(res.body)
            .to.be.an.instanceof(Object)
            .and.to.have.property('message')
            .eql('Business Found');
          expect(res.body).to.have.property('business');
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should GET all business with the specified category', (done) => {
      // HTTP GET -> RETURN ALL BUSINESS WITH THE SPECIFIED CATEGORY
      chai.request(app)
        .get('/api/v1/businesses?category=sales')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('Business Found!');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  /*
    * Test the /PUT requests
  */
  describe('/PUT REQUESTS', () => {
    it('it should not update a business if name exists', (done) => {
      // HTTP PUT -> DON'T UPDATE A BUSINESS
      chai.request(app)
        .put('/api/v1/businesses/20')
        .set('Authorization', authToken)
        .send({
          businessName: 'shoprite',
          businessImage: 'shoprite.jpg',
          category: 'Sales',
          website: 'www.shoprite.com',
          email: 'shoprite@gmail.com',
          location: 'Nigeria'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('A business with this name exists!');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('it should not update a business if user is not logged in', (done) => {
      // HTTP PUT -> DON'T UPDATE A BUSINESS
      const wrongToken = `${authToken}gftsg`;
      chai.request(app)
        .put('/api/v1/businesses/1')
        .set('Authorization', wrongToken)
        .send({
          businessName: 'shoprite',
          businessImage: 'shoprite.jpg',
          category: 'Sales',
          website: 'www.shoprite.com',
          email: 'shoprite@gmail.com',
          location: 'Nigeria'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Kindly sign in');
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('it should update a business', (done) => {
      // HTTP PUT -> UPDATE A BUSINESS
      chai.request(app)
        .put('/api/v1/businesses/1')
        .set('Authorization', authToken)
        .send({
          businessName: 'shoprite supermarket',
          businessImage: 'shoprite.jpg',
          category: 'Sales',
          website: 'www.shopritesupermarket.com',
          email: 'shoprite@gmail.com',
          location: 'Nigeria'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('message')
            .eql('Business Update Successful');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  /*
    * Test the /DELETE route
  */
  describe('/DELETE REQUESTS', () => {
    it('it should not delete a business if user is not logged in', (done) => {
      // HTTP DELETE -> DON'T REMOVE A BUSINESS
      const wrongToken = `${authToken}gftsg`;
      chai.request(app)
        .delete('/api/v1/businesses/1')
        .set('Authorization', wrongToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('Kindly sign in');
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('it should delete a business', (done) => {
      // HTTP DELETE -> REMOVE A BUSINESS
      chai.request(app)
        .delete('/api/v1/businesses/1')
        .set('Authorization', authToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('Business Successfully Deleted!');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
