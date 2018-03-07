import express from 'express';
import Users from '../controllers/userController';
import Business from '../controllers/businessController';

const router = express.Router();

//	Users endpoints
router.post('/auth/signup', Users.registerUsers);
router.post('/auth/login', Users.loginUser);

//	Business endpoints
router.post('/businesses', Business.registerBusiness);
router.put('/businesses/:businessId', Business.updateBusiness);
router.delete('/businesses/:businessId', Business.removeBusiness);
router.get('/businesses/:businessId', Business.getABusiness);
router.get('/businesses', Business.getAllBusinesses);
router.post('/businesses/:businessId/reviews', Business.addReview);
router.get('/businesses/:businessId/reviews', Business.getAllReviews);

export default router;
