import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {AppContextType} from 'next/dist/next-server/lib/utils';
import {Router} from 'next/router';
import '../styles/global.scss';

class CustomApp extends App {
  static async getInitialProps({Component, ctx}: AppContextType<Router>) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <div>
        <Head>
          <title>Monbrand Software</title>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default CustomApp;
