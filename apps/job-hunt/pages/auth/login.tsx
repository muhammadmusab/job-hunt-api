import { AuthLayout } from '@/components/layouts';
import SocialLogins from '@/components/ui/social-logins/SocialLogins';
import { ClCol, ClGeneralForm, ClLink, Control } from '@codelab/ui';
import { loginSchema } from '@codelab/validations';
import { NextPageWithLayout } from 'pages/_app';

const Login: NextPageWithLayout = (props) => {
  const initialValues = {
    email: '',
    password: '',
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
    {
      control: Control.TextInput,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
  ];
  const validationSchema = loginSchema;

  return (
    <>
      <div>
        <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '28rem' }}
          title='Welcome Back'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          initialValues={initialValues}
          controls={controls}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          submitBtnText='Login'
          submitBtnProps={{ className: 'w-100 mb-3' }}
          preButtonChildren={
            <p className='text-gray-7 fs-sm mb-3' style={{ textAlign: 'end' }}>
              <ClLink href={`/auth/forgot-password`} className='text-gray-5'>
                Forgot your Password?
              </ClLink>
            </p>
          }
          formFooter={
            <ClCol xs={12} className='d-flex'>
              <ClLink href='/auth/register' className='w-100 btn btn__outline-primary'>
                Create an account
              </ClLink>
            </ClCol>
          }
        />
      </div>
      <div className='flex-column'>
        <SocialLogins />
      </div>
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
