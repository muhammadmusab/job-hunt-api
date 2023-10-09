import { object, string, array,number } from 'yup';

export const jobAddSchema = object({
  title: string().required(),
  photos: array().of(object({preview:string().required(),id:number()})).required(),
});
