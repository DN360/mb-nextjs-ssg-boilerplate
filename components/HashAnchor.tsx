import React from 'react';
import classes from '../styles/HashAnchor.module.scss';

export const HashAnchor: React.FC<{id: string}> = ({id}) => {
  return (
    <div className={classes.root}>
      <div className={classes.hashAnchor} id={id} />
    </div>
  );
};
