import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { ClContainer } from '../../container/Container';
import { ClRow } from '../../row/Row';
import { ClCol, IColProps } from '../../col/Col';

export enum FormStatus {
  Loading = 'Loading',
  Ready = 'Ready',
}

import { FormControl, IFormControl } from '../formControl/FormControl';
import { ClButton, IButtonProps } from '../../button/Button';
import { SchemaOf } from 'yup';
import ClHeading, { IHeadingProps } from '../../heading/Heading';
import { ComponentAttrs } from '../../../types/general';
interface IProps<T, U> extends ComponentAttrs {
  initialValues: FormikValues & T;
  onSubmit: (values: T) => void;
  controls: (IFormControl & { colProps?: IColProps })[];
  submitBtnText?: string;
  submitBtnProps?: IButtonProps;
  validationSchema: SchemaOf<U>;
  title?: React.ReactNode;
  titleProps?: IHeadingProps;
  formFooter?: React.ReactNode;
  preButtonChildren?: React.ReactNode;
}

export const ClGeneralForm = <T extends unknown, U extends Object>({
  initialValues,
  controls,
  onSubmit,
  submitBtnText = 'Submit',
  submitBtnProps,
  validationSchema,
  title,
  titleProps,
  formFooter,
  preButtonChildren,
  ...rest
}: IProps<T, U>) => {
  let formGroups = controls.map(({ colProps, ...rest }, i) => {
    return (
      <ClCol key={i} {...colProps}>
        <FormControl {...rest} />
      </ClCol>
    );
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => (
        <Form className='row' {...rest}>
          {title && <ClHeading {...titleProps}>{title}</ClHeading>}

          {formGroups}
          {preButtonChildren && preButtonChildren}
          <ClCol xs={12} className='d-flex'>
            <ClButton type='submit' {...submitBtnProps}>
              {submitBtnText}
            </ClButton>
          </ClCol>
          {formFooter && formFooter}
        </Form>
      )}
    </Formik>
  );
};
