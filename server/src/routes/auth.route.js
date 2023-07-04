import express from 'express';

const router = express.Router();

import { registerUser, userLogin, logoutUser } from '../controllers/auth.controller.js';
import { loginValidator, registerValidator } from '../middlewares/validation/user.validation.js';

router.post('/lodge-connect/user/register', registerValidator, registerUser);
router.post('/lodge-connect/user/login', loginValidator, userLogin);
router.post('/lodge-connect/user/logout', logoutUser);

export default router;
