import { classNames } from '@codelab/lib';
import React, { useEffect, useCallback } from 'react';
import { ComponentAttrs } from '../../types/general';
import { useExternalScript } from '@codelab/hooks';
import {Loader} from '../loader/Loader';

interface IProps extends ComponentAttrs {
  onLogin: (data: any) => void;
}

export const ClGoogleLoginButton = ({ className = '', onLogin, ...rest }: IProps) => {
  const { state } = useExternalScript('https://accounts.google.com/gsi/client');
  // const memoizedLoginCb = useCallback(
  //   onLogin,
  //   [],
  // )

  useEffect(() => {

    if (state === 'ready') {
      window.google.accounts.id.initialize({
        client_id: '794563641741-ine4st88cesp6rj9jhq8k4nhoap9s8d0.apps.googleusercontent.com',
        callback: onLogin,
      });

      const parent = document.getElementById('google_btn');
      window.google.accounts.id.renderButton(parent, { theme: 'outline', width: 226 });
      window.google.accounts.id.prompt();
    }


  }, [state, onLogin]);

  let btnJSX = <div id='google_btn' className={className} {...rest}></div>;

  if (state === 'loading') {
    btnJSX = <Loader />;
  }
  return btnJSX

  // <button className={classes} {...rest} onClick={onPrompt}>
  //   <div className='logo'>
  //     <svg
  //       xmlns='http://www.w3.org/2000/svg'
  //       xmlnsXlink='http://www.w3.org/1999/xlink'
  //       viewBox='0 0 48 48'
  //     >
  //       <defs>
  //         <path
  //           id='a'
  //           d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'
  //         ></path>
  //       </defs>
  //       <clipPath id='b'>
  //         <use xlinkHref='#a' overflow='visible'></use>
  //       </clipPath>
  //       <path clip-path='url(#b)' fill='#FBBC05' d='M0 37V11l17 13z'></path>
  //       <path clip-path='url(#b)' fill='#EA4335' d='M0 11l17 13 7-6.1L48 14V0H0z'></path>
  //       <path clip-path='url(#b)' fill='#34A853' d='M0 37l30-23 7.9 1L48 0v48H0z'></path>
  //       <path clip-path='url(#b)' fill='#4285F4' d='M48 48L17 24l-4-3 35-10z'></path>
  //     </svg>
  //   </div>
  //   <p className='content'>Continue With Google</p>
  //   {state === 'loading' ? <p>Loading</p> : null}
  // </button>
};

// Todos
// Clean up the social buttons and create a single component which accepts type of social button

// Use this for adding google login (this will be needed to google script)

// https://plainenglish.io/blog/how-to-load-a-dynamic-script-in-react-2940d30998dd
