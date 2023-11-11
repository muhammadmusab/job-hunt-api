import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Create, Delete, List, Update } from '../controllers/address';
const router = express.Router();

router.post('/create', authMiddlewareFunction(), Create);

router.put('/update/:uid', authMiddlewareFunction(), Update);

router.delete('/delete/:uid', authMiddlewareFunction(), Delete);

router.get('/list', authMiddlewareFunction(), List);

export default router;
