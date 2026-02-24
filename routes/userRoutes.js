import express from 'express';
import {getAllUsers, me} from '../controllers/usersController.js';
import { verifyJWT, verifyAdmin } from '../middleware/protect.js';

const router = express.Router();

router.use(verifyJWT)

router.get('/',verifyAdmin, getAllUsers);
router.get('/me', me)


export default router;
