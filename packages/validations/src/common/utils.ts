import { ObjectSchema }  from 'yup';
import * as yup from 'yup';

export function merge(...schemas: ObjectSchema<Record<string, any>>[]) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);

  return merged;
}

export function mergeYupSchemas(...schemas: yup.ObjectSchema<Record<string, any>>[]) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
}