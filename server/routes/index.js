import express from 'express';
import Users from '../controllers/userController';
import Business from '../controllers/businessController';
import userValidator from '../middleware/userValidator';
import businessValidator from '../middleware/businessValidator';

const router = express.Router();

//	Users endpoints
router.post('/auth/signup', userValidator.userSignUp, Users.registerUsers);
router.post('/auth/login', userValidator.userLogin, Users.loginUser);

//	Business endpoints
router.post('/businesses', businessValidator.registerBusiness, businessValidator.verifyToken, Business.registerBusiness);
router.put('/businesses/:businessId', businessValidator.registerBusiness, businessValidator.verifyToken, Business.updateBusiness);
router.delete('/businesses/:businessId', businessValidator.verifyToken, Business.removeBusiness);
router.get('/businesses/:businessId', Business.getABusiness);
router.get('/businesses', businessValidator.query, Business.getAllBusinesses);
router.post('/businesses/:businessId/reviews', Business.addReview);

export default router;
