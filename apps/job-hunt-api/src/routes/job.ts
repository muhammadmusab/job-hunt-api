import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Create, Get, Delete, List, Update } from '../controllers/job';
import { Apply,ListAppliedJobs } from '../controllers/userJob';
const router = express.Router();

router.post('/create', authMiddlewareFunction(), Create);

router.post('/apply', authMiddlewareFunction(), Apply);
router.get('/applied/:uid', authMiddlewareFunction(), ListAppliedJobs);

router.get('/get/:uid', authMiddlewareFunction(), Get);

router.delete('/delete/:uid', authMiddlewareFunction(), Delete);

router.put('/update/:uid', authMiddlewareFunction(), Update);

router.get('/list', authMiddlewareFunction(), List);

export default router;
