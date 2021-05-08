import React from 'react';
import classes from '../styles/Spacer.module.scss';
import {cls, isEmpty} from '../utils';

export const Spacer: React.FC<{size: 'headerHeight' | 'thin' | 'thick' | number, horizontal?: boolean}> = ({size, horizontal}) => {
  const className = size === 'headerHeight' ?
    classes.headerHeight :
  size === 'thin' ?
    (horizontal ? classes.thinWidth : classes.thinHeight) :
  size === 'thick' ?
  (horizontal ? classes.thickWidth : classes.thickHeight) :
  null;
  if (isEmpty(className)) {
    return (
      <div style={horizontal ? {width: `${size}px`} : {height: `${size}px`}} />
    );
  }
  return (
    <div className={cls(classes.root, className)} />
  );
};
