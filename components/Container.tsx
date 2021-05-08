import React from 'react';
import classes from '../styles/Container.module.scss';
import {cls} from '../utils';

export const Container: React.FC<{className?: string, fluid?: boolean}> = ({children, className, fluid}) => {
  return (
    <div className={cls(classes.root, className, fluid ? classes.rootFruid : null)}>
      {children}
    </div>
  );
};
