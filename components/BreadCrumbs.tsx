import React from 'react';
import Link from 'next/link';
import classes from '../styles/BreadCrumbs.module.scss';
import {Spacer} from './Spacer';

export const BreadCrumbs: React.FC<{crumbs: [string, string][]}> = ({crumbs}) => {
  return (
    <div className={classes.root}>
      <Spacer size="thick" />
      <div className={classes.container}>
        {
          crumbs.map((crumb, i) => (
            <div className={classes.crumb} key={`crumb-${i}`}>
              <Link href={crumb[0]}><a>{crumb[1]}</a></Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};
