import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import {
  Create,
  Get,
  Delete,
  UserBasedJobList,
  Update,
  ActiveJobsList,
  UserBasedJobListWithFilters,
  CompanyBasedJobList
} from '../controllers/job';
import { Apply, createAdditionalDocuments } from '../controllers/userJob';
const router = express.Router();
import { uploadMiddleware } from '../middlewares/upload-middleware';

router.post('/create', authMiddlewareFunction(), Create); //job create route for company

router.post('/apply', authMiddlewareFunction(), Apply); //job apply route for user

router.post(
  '/apply/upload-documents',
  uploadMiddleware().array('additionalDocuments'),
  authMiddlewareFunction(),
  createAdditionalDocuments,
); //upload-additional-docs

router.get('/get/:uid', Get); //General route to get job data without authentication

router.delete('/delete/:uid', authMiddlewareFunction(), Delete); //delete job route for company

router.put('/update/:uid', authMiddlewareFunction(), Update); //update job route for company

router.get('/active/list', ActiveJobsList); // Active Job List route for anyone without authentication

//Job list for users based on job status :'cancelled' || 'applied' || 'interviews'
router.get('/company/list', authMiddlewareFunction(), CompanyBasedJobList);
//Job list for companies based on job status :'new' || 'past' || 'interviews'
router.get('/user/list', authMiddlewareFunction(), UserBasedJobList);

router.get('/user/filtered-list', authMiddlewareFunction(), UserBasedJobListWithFilters); //Job list for users with filters

export default router;
