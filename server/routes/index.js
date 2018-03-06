import express from 'express';
import Users from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', Users.registerUsers);

export default router;
