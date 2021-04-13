import React, {} from 'react';
import classes from '../styles/index.module.scss';
import Head from 'next/head';
import {NextPage} from 'next';

const IndexPage: NextPage<{}> = () => {
  return (
    <div className={classes.root}>
      <Head>
        <title>Monbrand software | TOP</title>
      </Head>
    </div>
  );
};

export default IndexPage;
