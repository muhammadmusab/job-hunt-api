import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Get, Delete, Update } from '../controllers/user/user';
const router = express.Router();

router.put('/update/:uid', authMiddlewareFunction(), Update);
router.get('/get/:uid', authMiddlewareFunction(), Get);
router.delete('/delete/:uid', authMiddlewareFunction(), Delete);

export default router;
