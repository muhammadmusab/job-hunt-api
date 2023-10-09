import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikBag, FormikValues, FormikHelpers } from 'formik';

import { ClButton, IButtonProps } from '../../button/Button';
import { ComponentAttrs } from '../../../types/general';
import { ClCol, IColProps } from '../../col/Col';
import { FormControl, IFormControl } from '../formControl/FormControl';
import { SchemaOf } from 'yup';
import ClHeading, { IHeadingProps } from '../../heading/Heading';
// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
interface IProps<T> extends ComponentAttrs {
  initialValues: FormikValues & T;
  onSubmit: (values: T, step: number, isLastStep: boolean) => Promise<void> | void;
  title?: React.ReactNode;
  titleProps?: IHeadingProps;
  submitBtnProps?: IButtonProps;
  formFooter?: React.ReactNode;
  getFormValues?: (values: FormikValues & T) => void;
}
export const ClMultistepWizard = <T extends unknown>({
  children,
  initialValues,
  onSubmit,
  title,
  titleProps,
  submitBtnProps,
  formFooter,
  getFormValues,
  ...rest
}: IProps<T>) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber] as any;
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues & T) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: FormikValues & T) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: FormikValues & T, bag: FormikHelpers<FormikValues & T>) => {
    // if (step.props.onSubmit) {
    //   step.props.onSubmit(values, bag);
    // }
    // if (isLastStep) {
    //   return onSubmit(values);
    // } else {
    //   bag.setTouched({});
    //   next(values);
    // }
    await onSubmit(values, stepNumber, isLastStep);
    if (!isLastStep) {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => {
        if (getFormValues) {
          getFormValues(formik.values);
        }
        return (
          <Form {...rest}>
            {title && <ClHeading {...titleProps}>{title}</ClHeading>}
            {step}

            <ClCol xs={12} className='d-flex mb-3'>
              <ClButton {...submitBtnProps} disabled={formik.isSubmitting} type='submit'>
                {isLastStep ? 'Submit' : 'Next'}
              </ClButton>
            </ClCol>
            {stepNumber > 0 && (
              <ClCol xs={12} className='d-flex'>
                <ClButton
                  variant='outline-gray-7 w-100'
                  onClick={() => previous(formik.values)}
                  type='button'
                >
                  Back
                </ClButton>
              </ClCol>
            )}

            {formFooter && formFooter}
          </Form>
        );
      }}
    </Formik>
  );
};

interface IStepProps {
  controls: (IFormControl & { colProps?: IColProps })[];
  children?: React.ReactNode;
  initialValues?: FormikValues;
  validationSchema: SchemaOf<any>;
}

export const ClWizardStep = ({ children, controls }: IStepProps) => {
  let formControls = controls.map(({ colProps, ...rest }, i) => {
    return (
      <ClCol xs={12} key={i} {...colProps}>
        <FormControl {...rest} />
      </ClCol>
    );
  });
  return (
    <>
      {formControls}
      {children}
    </>
  );
};

// const App = () => (
//   <div>
//     <h1>Formik Multistep Wizard</h1>
//     <Wizard
//       initialValues={{
//         email: '',
//         firstName: '',
//         lastName: '',
//       }}
//       onSubmit={async values =>
//         sleep(300).then(() => console.log('Wizard submit', values))
//       }
//     >
//       <WizardStep
//         onSubmit={() => console.log('Step1 onSubmit')}
//         validationSchema={Yup.object({
//           firstName: Yup.string().required('required'),
//           lastName: Yup.string().required('required'),
//         })}
//       >
//         <div>
//           <label htmlFor="firstName">First Name</label>
//           <Field
//             autoComplete="given-name"
//             component="input"
//             id="firstName"
//             name="firstName"
//             placeholder="First Name"
//             type="text"
//           />
//           <ErrorMessage className="error" component="div" name="firstName" />
//         </div>
//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <Field
//             autoComplete="family-name"
//             component="input"
//             id="lastName"
//             name="lastName"
//             placeholder="Last Name"
//             type="text"
//           />
//           <ErrorMessage className="error" component="div" name="lastName" />
//         </div>
//       </WizardStep>
//       <WizardStep
//         onSubmit={() => console.log('Step2 onSubmit')}
//         validationSchema={Yup.object({
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('required'),
//         })}
//       >
//         <div>
//           <label htmlFor="email">Email</label>
//           <Field
//             autoComplete="email"
//             component="input"
//             id="email"
//             name="email"
//             placeholder="Email"
//             type="text"
//           />
//           <ErrorMessage className="error" component="div" name="email" />
//         </div>
//       </WizardStep>
//     </Wizard>
//   </div>
// );

// export default App;
