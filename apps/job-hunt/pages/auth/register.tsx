import { AuthLayout } from '@/components/layouts';
import SocialLogins from '@/components/ui/social-logins/SocialLogins';
import { ClMultistepWizard, ClWizardStep, Control } from '@codelab/ui';
import { NextPageWithLayout } from '../_app';
import { step1Schema, step2Schema, step3Schema } from '@codelab/validations';
import { useState } from 'react';
import CustomRadioLabel from '../../components/ui/customRadioLabel/CustomRadioLabel';

import { FaBriefcase, FaUser } from 'react-icons/fa';

const Register: NextPageWithLayout = (props) => {
  // I need to access type so that i can define steps conditionally, to get values use this
  // https://stackoverflow.com/questions/56268194/update-another-component-when-formik-form-changes/56269090#56269090
  const [type, setType] = useState('');

  // const getFormValues = useCallback((values: typeof initialValues) => {
  //   setType(values.type);
  // }, []);
  const initialValues = {
    type: 'company',
  };

  const onSubmit = (values: typeof initialValues, step: number, isLastStep: Boolean) => {
    if(step === 0){
      if(values.type){
        setType(values.type)
      }
    }
    console.log(values);
  };

  const step1Controls = [
    {
      control: Control.RadioInput,
      className: 'justify-content-between',
      name: 'type',
      // label: 'You are: ',
      customLabel: true,
      hideRadios: true,
      inline: true,
      radios: [
        {
          value: 'company',
          label: (
            <CustomRadioLabel
              className='d-flex flex-column justify-content-center align-items-center'
              htmlFor='company'
            >
              <FaBriefcase size={24} className='mb-2' />I am a company
            </CustomRadioLabel>
          ),
        },
        {
          value: 'individual',
          label: (
            <CustomRadioLabel
              className='d-flex flex-column justify-content-center align-items-center'
              htmlFor='individual'
            >
              <FaUser size={24} className='mb-2' />
              Individual
            </CustomRadioLabel>
          ),
        },
      ],
    },
  ];
  const step2Controls = [
    {
      control: Control.TextInput,
      name: 'email',
      placeholder: 'Email',
    },
    {
      control: Control.TextInput,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
    {
      control: Control.TextInput,
      name: 'passwordRepeat',
      placeholder: 'Password (Repeat)',
      type: 'password',
    },
  ];

  const step3IndividualControls = [
    {
      control: Control.TextInput,
      name: 'firstName',
      placeholder: 'First name',
    },
    {
      control: Control.TextInput,
      name: 'lastName',
      placeholder: 'Last name',
    },
  ];
  const step3CompanyControls = [
    {
      control: Control.TextInput,
      name: 'companyName',
      placeholder: 'Company Name',
    },
  ];

  return (
    <>
      <div>
        <ClMultistepWizard
          style={{ maxWidth: '28rem' }}
          className='row'
          initialValues={initialValues}
          onSubmit={onSubmit}
          title='Join Our Platform'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          submitBtnProps={{ className: 'w-100' }}
        >
          <ClWizardStep controls={step1Controls} validationSchema={step1Schema} />
          <ClWizardStep controls={step2Controls} validationSchema={step2Schema} />
          {type === 'individual' ? (
            <ClWizardStep controls={step3IndividualControls} validationSchema={step3Schema} />
          ) : (
            <ClWizardStep controls={step3CompanyControls} validationSchema={step3Schema} />
          )}
          {}
        </ClMultistepWizard>
      </div>

      <div className='flex-column'>
        <SocialLogins />
        {/* <ClGoogleLoginButton className='mb-3' onLogin={onGoogleLogin} />
          <ClFacebookLoginButton appId='1460628304461567' callback={onfacebookLogin} /> */}
      </div>
    </>
  );
};

Register.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
