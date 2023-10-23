import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
import { Get, Delete, Update } from '../controllers/user/user';
import {
  createUserEducation,
  deleteUserEducation,
  listUserEducation,
  updateUserEducation,
} from '../controllers/user/userEducation';
import {
  createUserExperience,
  deleteUserExperience,
  listUserExperience,
  updateUserExperience,
} from '../controllers/user/userExperience';
import {
  createUserCertification,
  deleteUserCertification,
  listUserCertification,
  updateUserCertification,
} from '../controllers/user/userCertification';
import {
  createUserSkill,
  deleteUserSkill,
  listUserSkill,
  updateUserSkill,
} from '../controllers/user/userSkill';
import { uploadMiddleware } from '../middlewares/upload-middleware';
const router = express.Router();

router.get('/get', authMiddlewareFunction(), Get);
router.put('/update', authMiddlewareFunction(), Update);
router.delete('/delete', authMiddlewareFunction(), Delete);

// user education
router.post('/education/create', authMiddlewareFunction(), createUserEducation);
router.put('/education/update/:uid', authMiddlewareFunction(), updateUserEducation);
router.delete('/education/delete/:uid', authMiddlewareFunction(), deleteUserEducation);
router.get('/education/list', authMiddlewareFunction(), listUserEducation);
// user experience
router.post('/experience/create', authMiddlewareFunction(), createUserExperience);
router.put('/experience/update/:uid', authMiddlewareFunction(), updateUserExperience);
router.delete('/experience/delete/:uid', authMiddlewareFunction(), deleteUserExperience);
router.get('/experience/list', authMiddlewareFunction(), listUserExperience);
// user certification
router.post(
  '/certification/create',
  uploadMiddleware().array('certificate'),
  authMiddlewareFunction(),
  createUserCertification,
);
router.put(
  '/certification/update/:uid',
  uploadMiddleware().array('certificate'),
  authMiddlewareFunction(),
  updateUserCertification,
);
router.delete('/certification/delete/:uid', authMiddlewareFunction(), deleteUserCertification);
router.get('/certification/list', authMiddlewareFunction(), listUserCertification);
// user skill
router.post('/skill/create', authMiddlewareFunction(), createUserSkill);
router.put('/skill/update/:uid', authMiddlewareFunction(), updateUserSkill);
router.delete('/skill/delete/:uid', authMiddlewareFunction(), deleteUserSkill);
router.get('/skill/list', authMiddlewareFunction(), listUserSkill);

export default router;
