import express from 'express';
import authMiddlewareFunction from '../middlewares/auth-middleware';
// import { validate } from '../middlewares/validate-middleware';
import {
  register,
  verifyEmailAddress,
  ResendVerificationMail,
  signin,
  signout,
  refreshToken,
  resetPassword,
  resetPasswordMail,
  deleteAccount,
} from '../controllers/auth';
import { uploadMiddleware } from '../middlewares/upload-middleware';
// import { profileUpdateSchema } from "../validations/user-validations"; //route specific validations will be added by shumas
const router = express.Router();

router.post('/register', uploadMiddleware().array('profileImage'), register);
router.get('/verify-email', verifyEmailAddress);
router.post('/resend-verification-mail', ResendVerificationMail);
router.post('/signin', signin);

router.post('/delete-account', authMiddlewareFunction(), deleteAccount);
router.get('/signout', authMiddlewareFunction(), signout);
router.post('/reset-password-mail', resetPasswordMail);
router.post('/reset-password', resetPassword);

router.get('/refresh-token', authMiddlewareFunction(true), refreshToken);
export default router;
