import express from 'express';
import Users from '../controllers/userController';
import Business from '../controllers/businessController';
import userValidator from '../middleware/userValidator';

const router = express.Router();

//	Users endpoints
router.post('/auth/signup', userValidator.userSignUp, Users.registerUsers);
router.post('/auth/login', userValidator.userLogin, Users.loginUser);
router.get('/auth/', Users.getAllUsers);

//	Business endpoints
router.post('/businesses', Business.registerBusiness);
router.put('/businesses/:businessId', Business.updateBusiness);
router.delete('/businesses/:businessId', Business.removeBusiness);
router.get('/businesses/:businessId', Business.getABusiness);
router.get('/businesses', Business.getAllBusinesses);
router.post('/businesses/:businessId/reviews', Business.addReview);
router.get('/businesses/:businessId/reviews', Business.getAllReviews);

export default router;
