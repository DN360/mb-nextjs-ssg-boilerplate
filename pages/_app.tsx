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
        <Component {...pageProps} />
      </div>
    );
  }
}

export default CustomApp;
