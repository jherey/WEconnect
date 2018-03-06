import express from 'express';
import Users from '../controllers/userController';

const router = express.Router();

//	Users endpoints
router.post('/auth/signup', Users.registerUsers);
router.post('/auth/login', Users.loginUser);

export default router;
