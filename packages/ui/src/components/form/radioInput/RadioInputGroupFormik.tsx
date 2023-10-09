import { Field, FieldProps } from 'formik';
import React from 'react';
import { ComponentAttrs } from '../../../types/general';
import Error from '../../error/Error';

import { ClRadioGroup } from './RadioInputGroup';

type Check = {
  value: string;
  label: React.ReactNode;
};

export interface IRadioGroupFormikProps extends ComponentAttrs {
  name: string;
  radios: Check[];
}

export const ClRadioInputFormik = ({ name, radios, children, ...rest }: IRadioGroupFormikProps) => {
  return (
    <Field name={name}>
      {({ form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);

        return (
          <>
            <ClRadioGroup
              value={form.values[name]}
              radios={radios}
              onValueChange={(value: string) => form.setFieldValue(name, value)}
              name={name}
              {...rest}
            >
              {hasError && <Error>{form.errors[name]}</Error>}
              {children}
            </ClRadioGroup>
          </>
        );
      }}
    </Field>
  );
};
