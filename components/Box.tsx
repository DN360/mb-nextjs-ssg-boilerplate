import React from 'react';
import {cls} from 'utils';
import classes from '../styles/Box.module.scss';
import {Hidden} from './MediaQueryComponents';

const sizeArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
type Size = (typeof sizeArray)[number]


export const BoxContainer: React.FC<React.HTMLAttributes<HTMLDivElement> & {size: Size, mobilesize?: Size}> = (props) => {
  const {size, mobilesize, children} = props;
  const slimProps = {...props,
    size: undefined, mobilesize: undefined, children: undefined};
  return (
    <>
      <Hidden on="pc">
        <div {...slimProps} className={cls(classes['box' + (mobilesize ? mobilesize : size)], slimProps.className)}>
          {children}
        </div>
      </Hidden>
      <Hidden on="mobile">
        <div {...slimProps} className={cls(classes['box' + size], slimProps.className)}>
          {children}
        </div>
      </Hidden>
    </>
  );
};
export const Box: React.FC<React.HTMLAttributes<HTMLDivElement> & {size: Size, mobilesize?: Size, mode?: 'normal' | 'flex' | 'center' | 'fluid' | 'flex-fluid'| 'center-fluid'}> = (props) => {
  const {size, mobilesize, children, mode, className} = props;
  const slimProps = {...props,
    size: undefined, mobilesize: undefined, children: undefined, mode: undefined, className: undefined};
  const _mode = mode || 'normal';
  const modeStr =
    _mode === 'center' ? 'boxFlexCenter' :
    _mode === 'center-fluid' ? 'boxFluidCenter' :
    _mode === 'flex' ? 'boxFlex' :
    _mode === 'flex-fluid' ? 'boxFluidFlex' :
    _mode === 'fluid' ? 'boxFluid' :
    null;
  const modeClass = modeStr === null ? null : classes[modeStr];
  return (
    <>
      <Hidden on="pc">{
        (() => {
          const _size = mobilesize || size;
          if (_size === '1') {
            return (
              <div {...slimProps} className={cls(classes.box, modeClass, className)} >
                {children}
              </div>
            );
          }
          return (
            <div {...slimProps} className={cls(classes.box, modeClass, classes['x' + _size], className)} >
              {children}
            </div>
          );
        })()
      }</Hidden>
      <Hidden on="mobile">{
        (() => {
          if (size === '1') {
            return (
              <div {...slimProps} className={cls(classes.box, modeClass, className)} >
                {children}
              </div>
            );
          }
          return (
            <div {...slimProps} className={cls(classes.box, modeClass, classes['x' + size], className)} >
              {children}
            </div>
          );
        })()
      }</Hidden>
    </>
  );
};

