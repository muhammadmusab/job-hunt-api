import { Field, FieldProps } from 'formik';
import React from 'react';
import { ComponentAttrs } from '../../../types/general';
import Error from '../../error/Error';

import { ClCheckbox } from './CheckInput';

export type Check = {
  value: string;
  label: React.ReactNode;

};

interface ICheckInputProps extends ComponentAttrs {
  name: string;
  checks: Check[];
}

export const ClCheckInputFormik = ({ name, checks, children }: ICheckInputProps) => {
  return (
    <Field name={name}>
      {({ form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);
       
        const checksJSX = checks.map((check) => (
          <ClCheckbox
           defaultChecked={form.values[name].indexOf(check.value) > -1}
            checked={form.values[name].indexOf(check.value) > -1}
            {...check}
            onCheckedChange={(checked: boolean | 'indeterminate') => {
              const values = [...form.values[name]];
              const checkedValueIdx = values.findIndex((value) => value === check.value);
              checkedValueIdx < 0 ? values.push(check.value) : values.splice(checkedValueIdx, 1);
              form.setFieldValue(name, values);
            }}
            key={check.value}
            name={name}
          />
        ));
        return (
          <>
            {checksJSX}
            {hasError && <Error>{form.errors[name]}</Error>}
            {children}
          </>
        );
      }}
    </Field>
  );
};
