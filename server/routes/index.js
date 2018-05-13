import express from 'express';
import Users from '../controllers/UserController';
import Business from '../controllers/BusinessController';
import Review from '../controllers/ReviewController';
import userValidator from '../middleware/userValidator';
import businessValidator from '../middleware/businessValidator';
import verifyToken from '../middleware/verifyToken';
import paramsChecker from '../middleware/paramsChecker';

const router = express.Router();

// Destructure middleware
const { userSignUp } = userValidator;
const { userLogin } = userValidator;
const { createBusinessValidator } = businessValidator;
const { query } = businessValidator;
const { tokenVerification } = verifyToken;
const { idChecker } = paramsChecker;

// Destructure controllers
const { getAllUsers } = Users;
const { registerUsers } = Users;
const { loginUser } = Users;
const { updateUser } = Users;
const { registerBusiness } = Business;
const { updateBusiness } = Business;
const { removeBusiness } = Business;
const { getBusiness } = Business;
const { addReview } = Review;
const { getAllReviews } = Review;

// Users endpoints
router
  .get('/auth/users', getAllUsers);
router
  .post('/auth/signup', userSignUp, registerUsers);
router
  .post('/auth/login', userLogin, loginUser);
router
  .put('/auth/:userId', userSignUp, tokenVerification, updateUser);

// Business endpoints
router
  .post(
    '/businesses',
    createBusinessValidator, tokenVerification, registerBusiness
  );
router
  .put(
    '/businesses/:businessId',
    createBusinessValidator, idChecker, tokenVerification, updateBusiness
  );
router
  .delete('/businesses/:businessId', idChecker, tokenVerification, removeBusiness);
router
  .get('/businesses/:businessId', idChecker, getBusiness);
router
  .get('/businesses', query, Business.getAllBusinesses);

// Review endpoints
router
  .post('/businesses/:businessId/reviews', idChecker, tokenVerification, addReview);
router
  .get('/businesses/:businessId/reviews', idChecker, getAllReviews);

export default router;
