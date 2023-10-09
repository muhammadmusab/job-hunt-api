import { ClFacebookLoginButton, ClGoogleLoginButton } from '@codelab/ui';
import { useCallback } from 'react';

const SocialLogins = () => {
  const onGoogleLogin = useCallback((data: any) => {
    console.log(data);
  }, []);

  // const onfacebookLogin = (response) => {
  //   // This will have access token, send to backend and do this:
  //   // 1)First inspect this token by:
  //   // i)   generating inspect token  (app-token-or-admin-token)  "https://graph.facebook.com/oauth/access_token?client_id={your-app-id}&client_secret={your-app-secret}&grant_type=client_credentials"
  //   //ii) inspect token here with access token and inspect token (here input token is actually the acecss token we get from frontend and access token is what we can refer to as inspect token (app-token-or-admin-token) ) graph.facebook.com/debug_token?input_token={token-to-inspect}&access_token={app-token-or-admin-token}

  //   // 2) Get data from this endpoint:
  //   // `https://graph.facebook.com/v15.0/me?access_token=${accessToken}`

  //   console.log(response);
  // };
  return (
    <>
      <ClGoogleLoginButton className='mb-3' onLogin={onGoogleLogin} />
      {/* <ClFacebookLoginButton appId='1460628304461567' callback={onfacebookLogin} /> */}
    </>
  );
};

export default SocialLogins;
