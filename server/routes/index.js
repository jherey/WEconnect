import express from 'express';
import Users from '../controllers/UserController';
import Business from '../controllers/BusinessController';
import Review from '../controllers/ReviewController';
import userValidator from '../middleware/userValidator';
import businessValidator from '../middleware/businessValidator';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

// Destructure middleware
const { userSignUp } = userValidator;
const { userLogin } = userValidator;
const { createBusinessValidator } = businessValidator;
const { query } = businessValidator;
const { tokenVerification } = verifyToken;

// Destructure controllers
const { registerUsers } = Users;
const { loginUser } = Users;
const { registerBusiness } = Business;
const { updateBusiness } = Business;
const { removeBusiness } = Business;
const { getBusiness } = Business;
const { addReview } = Review;
const { getAllReviews } = Review;

// Users endpoints
router
  .post('/auth/signup', userSignUp, registerUsers);
router
  .post('/auth/login', userLogin, loginUser);

// Business endpoints
router
  .post(
    '/businesses',
    createBusinessValidator, tokenVerification, registerBusiness
  );
router
  .put(
    '/businesses/:businessId',
    createBusinessValidator, tokenVerification, updateBusiness
  );
router
  .delete('/businesses/:businessId', tokenVerification, removeBusiness);
router
  .get('/businesses/:businessId', getBusiness);
router
  .get('/businesses', query, Business.getAllBusinesses);

// Review endpoints
router
  .post('/businesses/:businessId/reviews', tokenVerification, addReview);
router
  .get('/businesses/:businessId/reviews', getAllReviews);

export default router;
