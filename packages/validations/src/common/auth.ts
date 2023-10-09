import { object, string, ref } from 'yup';

export const getPasswordSchema = () => string().trim().required();
export const getEmailSchema = () => string().trim().required().email();

export const loginSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema(),
});

export const getPassswordRepeatSchema = (name = 'password') =>
  string()
    .trim()
    .required()
    .oneOf([ref(name), null], 'Passwords must match');


export const forgotPasswordSchema = object({
  email: getEmailSchema(),
});


export const resetPasswordSchema = object({
  password: getPasswordSchema(),
  passwordRepeat: getPassswordRepeatSchema(),
});