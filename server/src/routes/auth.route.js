import express from 'express';

const router = express.Router();

import { registerUser, userLogin, logoutUser } from '../controllers/auth.controller.js';

router.post('/lodge-connect/user/register', registerUser);
router.post('/lodge-connect/user/login', userLogin);
router.post('/lodge-connect/user/logout', logoutUser);

export default router;
