import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
const { expect } = chai;

let loginToken, secondLoginToken;

describe('REVIEWS', () => {
  before((done) => {
    const userDetails = {
      username: 'jherey',
      password: 'jeremiaholufayo'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        loginToken = res.body.token;
        done();
      });
  });

  before((done) => {
    const userDetails = {
      username: 'olufayo',
      password: 'jeremiaholufayo'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        secondLoginToken = res.body.token;
        done();
      });
  });

  describe('POST REQUESTS', () => {
    before((done) => {
      const business = {
        businessName: 'shoprite',
        businessImage: 'shoprite.jpg',
        businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        category: 'Sales',
        website: 'www.shoprite.com',
        email: 'shoprite@gmail.com',
        location: 'Nigeria'
      };
      chai.request(app)
        .post('/api/v1/businesses')
        .set('Authorization', loginToken)
        .send(business)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('it should not add a review for a business that doesn\'t exist', (done) => {
      // HTTP POST -> DON'T ADD A REVIEW FOR A BUSINESS
      const review = {
        userId: 1,
        review: 'good company, I like them'
      };
      chai.request(app)
        .post('/api/v1/businesses/11/reviews')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('it should not add a review for a business if token unmatch', (done) => {
      // HTTP POST -> DON'T ADD A REVIEW FOR A BUSINESS
      const wrongToken = `${loginToken}gftsg`;
      const review = {
        userId: 1,
        review: 'good company, I like them'
      };
      chai.request(app)
        .post('/api/v1/businesses/11/reviews')
        .set('Authorization', wrongToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('it should not add a review for a business if no rating', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        userId: 1,
        review: 'good company, I like them',
        starRating: ''
      };
      chai.request(app)
        .post('/api/v1/businesses/2/reviews')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('Please give a valid rating');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('it should not add a review for a business if review is empty', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        userId: 1,
        review: '  ',
        starRating: 3
      };
      chai.request(app)
        .post('/api/v1/businesses/2/reviews')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('Please write a review');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('it should add a review for a business', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        review: 'good company, I like them',
        starRating: 3
      };
      chai.request(app)
        .post('/api/v1/businesses/2/reviews')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('it should add a review for a business', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        review: 'second review',
        starRating: 5
      };
      chai.request(app)
        .post('/api/v1/businesses/2/reviews')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('PUT REQUESTS', () => {
    it('should not edit a review if not authenticated', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/1/reviews/1')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.eql('Kindly sign in');
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not edit a review with wrong token', (done) => {
      const wrongToken = `${loginToken}gftsg`;
      chai.request(app)
        .put('/api/v1/businesses/1/reviews/1')
        .set('Authorization', wrongToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.eql('Kindly sign in');
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not edit a review for non-created user', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        // userId: 1,
        editedReview: 'I like them so so much',
        editedStarRating: 5
      };
      chai.request(app)
        .put('/api/v1/businesses/1/reviews/1')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.eql('You cannot edit this review');
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should edit a review for right user', (done) => {
      // HTTP POST -> ADD A REVIEW FOR A BUSINESS
      const review = {
        // userId: 1,
        editedReview: 'I like them so so much',
        editedStarRating: 5
      };
      chai.request(app)
        .put('/api/v1/businesses/2/reviews/1')
        .set('Authorization', loginToken)
        .send(review)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').to.eql('Review update successful');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('GET REQUESTS', () => {
    it('it should not GET reviews for a business that doesn\'t exist', (done) => {
      // HTTP GET -> NO REVIEWS FOR WRONG BUSINESS
      chai.request(app)
        .get('/api/v1/businesses/8/reviews')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should GET all reviews for a business', (done) => {
      // HTTP GET -> RETURN ALL REVIEWS FOR A BUSINESS
      chai.request(app)
        .get('/api/v1/businesses/2/reviews')
        .end((err, res) => {
          console.log(res.body, '------------------');
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('DELETE REQUESTS', () => {
    it('should not delete a review if id is not a number', (done) => {
      // HTTP DELETE -> DON'T DELETE A REVIEW
      const wrongToken = `${loginToken}gftsg`;
      chai.request(app)
        .delete('/api/v1/businesses/1a/reviews/1')
        .set('Authorization', wrongToken)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message')
            .eql('ID can only be a number');
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  it('should not delete a review if user is not authenticated', (done) => {
    // HTTP DELETE -> DON'T DELETE A REVIEW
    const wrongToken = `${loginToken}gftsg`;
    chai.request(app)
      .delete('/api/v1/businesses/2/reviews/1')
      .set('Authorization', wrongToken)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });
});
