import React, {} from 'react';
import {useMediaQuery} from 'react-responsive';

export const Hidden: React.FC<{on: 'pc' | 'mobile'}> = ({on, children}) => {
  const mq = useMediaQuery({
    query: 'screen and (min-width: 721px)',
  });
  if (mq && on === 'pc') {
    return (<></>);
  }
  if (!mq && on === 'mobile') {
    return (<></>);
  }
  return (<>{children}</>);
};

export const getDevice = (): 'pc' | 'mobile' => {
  const mq = useMediaQuery({
    query: 'screen and (min-width: 721px)',
  });
  return mq ? 'mobile' : 'pc';
};
