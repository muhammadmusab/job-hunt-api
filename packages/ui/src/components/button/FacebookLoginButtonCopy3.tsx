import {  useExternalScript } from '@codelab/hooks';
import React, {  useEffect,  useMemo } from 'react';
import {  Loader } from '../loader/Loader';

// UPDATE THE COMPONENT AND USE THIS:
// https://developers.facebook.com/docs/facebook-login/web/js-example
// Take help from this:
// https://jasonwatmore.com/post/2020/10/25/react-facebook-login-tutorial-example

// Todos
// Cleanup
// 

interface IProps {
  
}

export const ClFacebookLoginButton = () => {
  // function testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function (response) {
  //     console.log('Successful login for: ' + response.name);
  //   });
  // }

  // function checkLoginState() {
  //   FB.getLoginStatus(function (response) {
  //     statusChangeCallback(response);
  //   });
  // }
  // function statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   // The response object is returned with a status field that lets the
  //   // app know the current login status of the person.
  //   // Full docs on the response object can be found in the documentation
  //   // for FB.getLoginStatus().
  //   if (response.status === 'connected') {
  //     // Logged into your app and Facebook.
  //     testAPI();
  //   } else {
  //     // The person is not logged into your app or we are unable to tell.
  //     console.log('NOT LOGGED IN');
  //   }
  // }

  const attributes = useMemo(() => {
    return {
      // crossorigin: 'anonymous',
      // nonce: '5pRf26Rp',
      id: 'facebook-jssdk',
    };
  }, []);
  const { state } = useExternalScript(
    'https://connect.facebook.net/en_US/sdk.js',
    true,
    true,
    attributes,
  );

  useEffect(() => {
    if (state !== 'loading') {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '1460628304461567',
          cookie: true, // enable cookies to allow the server to access
          // the session
          xfbml: true, // parse social plugins on this page
          version: 'v15.0', // Specify the Graph API version to use
        });

        // FB.getLoginStatus(function (response) {
        //   statusChangeCallback(response);
        // });
      };
    }
  }, [state]);

  const loginWithFb = async () => {

      const res = await fetch('https://www.facebook.com/v15.0/dialog/oauth?client_id=1460628304461567')
      
    // window.FB.login(
    //   ({ authResponse }) => {
    //     fetch(`https://graph.facebook.com/v15.0/me?access_token=${authResponse.accessToken}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         // FB.api(`/${data.id}/picture`, 'GET', { redirect: 'false',width:200 }, function (picture) {
    //         //   console.log(picture);
    //         // });
    //         fetch(`https://graph.facebook.com/v15.0/${data.id}/?access_token=${authResponse.accessToken}&fields=email,gender,first_name,birthday,hometown,last_name,profile_pic`).then(res=>res.json()).then(profileData=>{
    //         console.log(profileData,'PROFILE')
    //         })
    //       //   FB.api(
    //       //     `/${data.id}/`,
    //       //     function (response) {
    //       //       console.log(response,'RESPONSE PROFILE')
    //       //       if (response && !response.error) {
    //       //         /* handle the result */
    //       //       }
    //       //     }
    //       // );
    //         console.log(data);
    //       });

    //     // FB.api('/me', function(response) {
    //     //   console.log(response,'RESPONSE')
    //     // },);
    //   },
    //   { scope: 'public_profile,email' },
    // );
  };

  const btnJSX =
    state === 'loading' ? (
      <Loader />
    ) : (
      <button className='btn btn--fb btn--social btn__lg' onClick={loginWithFb}>
        <div className='logo'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            version='1'
          >
            <path
              fill='#FFFFFF'
              d='M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z'
            />
            <path
              fill='#4267b2'
              d='M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z'
            />
          </svg>
        </div>
        <p className='content'>Sign in with Facebook</p>
      </button>
    );

  return btnJSX;
};
