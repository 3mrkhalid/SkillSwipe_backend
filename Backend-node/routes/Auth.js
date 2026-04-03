import express from "express";
import verifyJwt from "../Middleware/verifyJwt.js";
import { login, register, logout, forgetPassword, resetPassword } from "../controllers/user.js";
import { AuthLimit, addRateHeader } from "../Middleware/limit.js"
const router = express.Router();

router.use(AuthLimit)
router.use(addRateHeader)

router.post('/login', login)
router.post('/register', register)
router.post('/logout', verifyJwt, logout)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)


export default router;