import { AuthLayout } from '@/components/layouts';
import SocialLogins from '@/components/ui/social-logins/SocialLogins';
import { ClGeneralForm, ClLink, Control } from '@codelab/ui';
import { resetPasswordSchema } from '@codelab/validations';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';

const resetPassword: NextPageWithLayout = (props) => {
  const router = useRouter();

  const initialValues = {
    password: '',
    passwordRepeat: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  const controls = [
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
  const validationSchema = resetPasswordSchema;

  const resetKey = router.query.key;
  console.log(resetKey);

  return (
    <>
      <div>
        <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '28rem' }}
          title='Recover your password'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          initialValues={initialValues}
          controls={controls}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          submitBtnText='Reset Password'
          submitBtnProps={{ className: 'w-100 mb-3' }}
          preButtonChildren={
            <p className='text-gray-7 fs-sm mb-3' style={{ textAlign: 'end' }}>
              <ClLink href='/auth/login' className='text-gray-5'>
                Want to log in instead?
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

resetPassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default resetPassword;
