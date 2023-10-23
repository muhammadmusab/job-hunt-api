import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Get, Delete, Update } from '../controllers/company/company';
import {
  createCompanyArea,
  deleteCompanyArea,
  listCompanyArea,
  updateCompanyArea,
} from '../controllers/company/companyArea';
import {
  createCompanyContact,
  deleteCompanyContact,
  listCompanyContact,
  updateCompanyContact,
} from '../controllers/company/companyContact';
import {
  createCompanySocial,
  deleteCompanySocial,
  listCompanySocial,
  updateCompanySocial,
} from '../controllers/company/companySocial';
const router = express.Router();

router.get('/get', authMiddlewareFunction(), Get);
router.put('/update', authMiddlewareFunction(), Update);
router.delete('/delete', authMiddlewareFunction(), Delete);

// company area
router.post('/area/create', authMiddlewareFunction(), createCompanyArea);
router.put('/area/update/:uid', authMiddlewareFunction(), updateCompanyArea);
router.delete('/area/delete/:uid', authMiddlewareFunction(), deleteCompanyArea);
router.get('/area/list', authMiddlewareFunction(), listCompanyArea);
// company contact
router.post('/contact/create', authMiddlewareFunction(), createCompanyContact);
router.put('/contact/update/:uid', authMiddlewareFunction(), updateCompanyContact);
router.delete('/contact/delete/:uid', authMiddlewareFunction(), deleteCompanyContact);
router.get('/contact/list', authMiddlewareFunction(), listCompanyContact);
// company social
router.post('/social/create', authMiddlewareFunction(), createCompanySocial);
router.put('/social/update/:uid', authMiddlewareFunction(), updateCompanySocial);
router.delete('/social/delete/:uid', authMiddlewareFunction(), deleteCompanySocial);
router.get('/social/list', authMiddlewareFunction(), listCompanySocial);

export default router;
