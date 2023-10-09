import { AuthLayout } from '@/components/layouts';
import SocialLogins from '@/components/ui/social-logins/SocialLogins';
import { ClGeneralForm, ClLink, Control } from '@codelab/ui';
import { forgotPasswordSchema } from '@codelab/validations';
import { NextPageWithLayout } from 'pages/_app';

const ForgotPassword: NextPageWithLayout = (props) => {
  const initialValues = {
    email: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  const controls = [
    {
      control: Control.TextInput,
      name: 'email',
      placeholder: 'Email',
    },
  ];
  const validationSchema = forgotPasswordSchema;
  return (
    <>
      <div>
        <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '28rem' }}
          title='Forgot password?'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          initialValues={initialValues}
          controls={controls}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          submitBtnText='Send password reset link'
          submitBtnProps={{ className: 'w-100 mb-3' }}
          preButtonChildren={
            <p className='text-gray-7 fs-sm mb-3' style={{ textAlign: 'end' }}>
              <ClLink href='/auth/login' className='text-gray-5'>
                Remembered your password?
              </ClLink>
            </p>
          }
        />
      </div>
      <div className='flex-column'>
        <SocialLogins />
      </div>
    </>
  );
};

ForgotPassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
