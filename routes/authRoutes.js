import express from 'express';
import {login, register, logout, refresh, forgetPassword, verifyResetCode, resetPassword } from '../controllers/authController.js';
import { AuthLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/register', AuthLimiter, register)
router.post('/login',  login)
router.post('/logout', logout)
router.get('/refresh', refresh)


router.post('/forgetPassword', forgetPassword)
router.post('/verifyResetCode', verifyResetCode)
router.post('/resetPassword', resetPassword)

export default router;