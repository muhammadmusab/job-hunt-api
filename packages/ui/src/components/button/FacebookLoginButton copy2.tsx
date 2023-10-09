import React from 'react';
import ReactDOM from 'react-dom';

// ISSUE THAT FIRST TIME IT DOESN'T WORK FIRST TIME

// TODOS
// specify a backend url for login (the restaurent api has backend code)
// Send redirect url and fb code to backend

const FB_ID = '1460628304461567';
const redirectUri = 'http://localhost:3001/test'; // tricky test.

interface IProps {
  appId:string,
  version:string
}

export const ClFacebookLoginButton = () => {
  const getUrlParameter = (e, uri) => {
    e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var t = new RegExp('[\\?&]' + e + '=([^&#]*)').exec(uri);
    return null === t ? null : decodeURIComponent(t[1].replace(/\+/g, ' '));
  };

  const buildUrlFb = () => {
    let params = 'fbloged=1';
    let uriX2 = encodeURIComponent(redirectUri);
    return `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FB_ID}&redirect_uri=${uriX2}&state=${params}`;
  };

  const popupWindow = (url, windowName, win, w, h) => {
    const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
    const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
    return win.open(
      url,
      windowName,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`,
    );
  };

  const openFbDialog = async () => {
    return new Promise((resolve, reject) => {
      let uri = buildUrlFb();
      let window01 = popupWindow(uri, '', window, 500, 500);
      // fire this immediately after the user accept the logged in
      window01.addEventListener('load', async (event) => {

        try {
          let uri02 = window01.location.href;
          let token = getUrlParameter('code', uri02);
          resolve(token);
          window01.close();
        } catch (ex) {
          reject(null);
        }
      });
    });
  };

  const loginWithFb = async () => {
    try {
      let code = await openFbDialog();
      console.log(code)
      const res = await fetch(
        `https://graph.facebook.com/v15.0/me?access_token=${accessToken}`,
      );
        const data = await res.json()
        console.log(data)
      // let response = await HttpClient.post("http://localhost:5050/fblogin", {"token": token, "redirectUri": redirectUri});
      // console.log(response);
    } catch (ex) {
      console.log(ex);
      console.log('there was an error');
    }
  };

  return (
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
};
