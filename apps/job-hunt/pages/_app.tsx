// import '../scss/globals.css';
import type { AppProps } from 'next/app';
import '../scss/main.scss'

import { NextPage } from 'next';
import React from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page);
  const AnyComponent = Component as any;
  return <>{getLayout(<AnyComponent {...pageProps} />)}</>;
}
