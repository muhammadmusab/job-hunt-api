import { AuthLayout } from '@/components/layouts';
import SocialLogins from '@/components/ui/social-logins/SocialLogins';
import { ClButton, ClGeneralForm, ClLink, Control } from '@codelab/ui';
import ClHeading from '@codelab/ui/src/components/heading/Heading';
import ClHoverCard from '@codelab/ui/src/components/hover-card/HoverCard';
import { resetPasswordSchema } from '@codelab/validations';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { TypeAnimation } from 'react-type-animation';

const postConfirmation: NextPageWithLayout = (props) => {
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

  const userFullName = router.query.fullname;

  return (
    <>
      <div className='flex-column' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity: '0.8'}}>
        <div>
        <ClHeading level={3} className='text-white'>
          {`Hi ${router.query.fullname},`}
        </ClHeading>       
        <TypeAnimation
          sequence={[
            1000, // Waits 1s
            'welcome to the Job Hunt community!', // Deletes 'One' and types 'Two'
            2000, // Waits 2s
            'log in and find your dream job now. 🔥💸', // Types 'Three' without deleting 'Two'
            () => {
              console.log('Done typing!'); // Place optional callbacks anywhere in the array
            },
          ]}
          wrapper='h1'
          cursor={true}
          repeat={0}
          className='mb-3 text-white'
          style={{ fontSize: '2em' }}
        />
        </div>
        <ClButton type={'button'}>
          Log in now
        </ClButton>
        {/* <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '28rem' }}
          title={`Hi ${router.query.fullname}, welcome to the Job Hunt community!`}
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
        /> */}
      </div>
      <div className='flex-column'>
        <ClHeading level={4} className='mb-3 text-gray-7'>
          {`Hover to explore our latest job posts.`}
        </ClHeading>
        {/* <article>
            <h3>Junior Developer</h3>
        </article> */}
        <div className='flex-row'>
          <ClHoverCard imageURL='https://ui-avatars.com/api/?background=ff3341&color=fff/?name=Kristijan+Vidovic' />
          <ClHoverCard imageURL='https://ui-avatars.com/api/?name=Kristijan+Vidovic' />
          <ClHoverCard imageURL='https://ui-avatars.com/api/?name=Shumas+Laghari' />
        </div>
      </div>
    </>
  );
};

postConfirmation.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default postConfirmation;
