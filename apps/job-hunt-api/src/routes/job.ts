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
  CompanyBasedJobList,
  AssignUserJobInterview,
  UpdateCompanyBasedJobStatus,
  UserJobsList,
setUserJobStatusCancelled,
} from '../controllers/job';
import { Apply, createAdditionalDocuments } from '../controllers/userJob';
const router = express.Router();
import { uploadMiddleware } from '../middlewares/upload-middleware';

//job create route for company
router.post('/create', authMiddlewareFunction(), Create);

//job apply route for user
router.post('/apply', authMiddlewareFunction(), Apply);

//upload-additional-docs
router.post(
  '/apply/upload-documents',
  uploadMiddleware().array('additionalDocuments'),
  authMiddlewareFunction(),
  createAdditionalDocuments,
);

//General route to get job data without authentication
router.get('/get/:uid', Get);

//delete job route for company
router.delete('/delete/:uid', authMiddlewareFunction(), Delete);

//update job route for company
router.put('/update/:uid', authMiddlewareFunction(), Update);

// Active Job List route for anyone without authentication
router.get('/active/list', ActiveJobsList);

//Job list for users based on job status :'cancelled' || 'applied' || 'interviews'
router.get('/company/list', authMiddlewareFunction(), CompanyBasedJobList);

//Job list for companies based on job status :'new' || 'past' || 'interviews'
router.get('/user/list', authMiddlewareFunction(), UserBasedJobList);

//Job list for users with filters
router.get('/user/filtered-list', authMiddlewareFunction(), UserBasedJobListWithFilters);

// set job status as 'interviews' from company
// :uid is jobUniqueId
router.put(
  '/company/update-status-interview/:uid',
  authMiddlewareFunction(),
  UpdateCompanyBasedJobStatus,
);
// assign user for job interview by company
router.put('/company/assign-interview', authMiddlewareFunction(), AssignUserJobInterview);

// :uid is jobUniqueId
// cancel job application from user
router.put('/user/update-status-cancelled/:uid', authMiddlewareFunction(), setUserJobStatusCancelled);

export default router;
