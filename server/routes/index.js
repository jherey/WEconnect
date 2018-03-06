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

export default router;
