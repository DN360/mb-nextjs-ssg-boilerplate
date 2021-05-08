import React, {useEffect, useRef, useState} from 'react';
import classes from '../styles/Accordion.module.scss';
import {Hidden} from './MediaQueryComponents';

export const Accordion: React.FC<{open: boolean, accordionMode?: 'all' | 'pc' | 'mobile'}> = ({children, open, accordionMode}) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [accordionHeight, setHeight] = useState<string>(null);

  useEffect(() => {
    if (accordionRef.current === null) {
      return;
    }
    if (open === true) {
      const height = Array.from(accordionRef.current.children).map((x) => {
        const style = getComputedStyle(x, null);
        return x.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom) + 16;
      }).reduce((a, b) => a + b) + 'px';
      setHeight(height);
    } else {
      setHeight(null);
    }
  }, [accordionRef, open]);
  if (accordionMode === undefined || accordionMode === 'all') {
    return (
      <div ref={accordionRef} className={classes.root} style={{
        height: accordionHeight === null ? undefined : accordionHeight,
      }}>
        {children}
      </div>
    );
  } else {
    return (
      <>
        <Hidden on={accordionMode === 'mobile' ? 'pc' : 'mobile'}>
          <div ref={accordionRef} className={classes.root} style={{
            height: accordionHeight === null ? undefined : accordionHeight,
          }}>
            {children}
          </div>
        </Hidden>
        <Hidden on={accordionMode}>
          {children}
        </Hidden>
      </>
    );
  }
};

