import express from 'express';
import Users from '../controllers/userController';
import userValidator from '../middleware/userValidator';

const router = express.Router();

//	Users endpoints
router.post('/auth/signup', userValidator.userSignUp, Users.registerUsers);
router.post('/auth/login', userValidator.userLogin, Users.loginUser);

export default router;
