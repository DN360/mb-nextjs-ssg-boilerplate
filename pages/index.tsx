import React, {} from 'react';
import classes from '../styles/index.module.scss';
import {NextPage} from 'next';
import { SmartHead } from 'components/SmartHead';

const IndexPage: NextPage<{}> = () => {
  return (
    <div className={classes.root}>
      <SmartHead />
    </div>
  );
};

export default IndexPage;
