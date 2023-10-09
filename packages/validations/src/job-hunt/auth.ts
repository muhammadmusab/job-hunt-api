import { object, ref, string } from 'yup';
import { getEmailSchema, getPassswordRepeatSchema, getPasswordSchema } from '../common/auth';
import { PASSWORD_REGEX } from '@codelab/lib';
import { merge } from '../common/utils';

export const step1Schema = object({ type: string().oneOf(['company', 'individual']).required() });

export const step2Schema = object({
  email: getEmailSchema(),
  password: getPasswordSchema().matches(
    PASSWORD_REGEX,
    'Password must contain atleast 8 characters,one lowercase,one uppercase and one number',
  ),
  passwordRepeat: getPassswordRepeatSchema(),
});

export const step3Schema = object().shape(
  {
    companyName: string().ensure().when('type', {
      is: 'company',
      then: string().required(),
    }),
    firstName: string().ensure().when('type', {
      is: 'individual',
      then: string().required(),
    }),
    lastName: string().ensure().when('type', {
      is: 'individual',
      then: string().required(),
    }),
  },
  [
    ['type', 'companyName'],
    ['type', 'firstName'],
    ['type', 'lastName'],
 
  ],
);

export const registerSchema = merge(step1Schema, step2Schema, step3Schema);
