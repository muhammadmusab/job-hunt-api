import express from 'express';

import { Create, Get, Delete, List, Update } from '../controllers/blog';
import basicAuth from '../middlewares/basic-auth-middleware';
const router = express.Router();

router.post('/create', basicAuth, Create);

router.get('/get/:uid', basicAuth, Get);

router.delete('/delete/:uid', basicAuth, Delete);

router.put('/update/:uid', basicAuth, Update);

router.get('/list', basicAuth, List);

export default router;
