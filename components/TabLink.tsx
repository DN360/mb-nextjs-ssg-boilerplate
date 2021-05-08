import React from 'react';
import {cls} from 'utils';

export const TabLink: React.FC<{href: string, className?: string}> = ({href, className, children}) => {
  return (
    <a rel="noreferrer" target="_blank" href={href} className={cls(className)}>
      {children}
    </a>
  );
};
