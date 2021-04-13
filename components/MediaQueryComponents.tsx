import React, {useEffect, useState} from 'react';

export const Hidden: React.FC<{on: 'pc' | 'mobile'}> = ({on, children}) => {
  const [width, setWidth] = useState(5000);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);
  if (width > 720 && on === 'pc') {
    return (<></>);
  } else if (width > 720 && on === 'mobile') {
    return (<>{children}</>);
  } else if (width <= 720 && on === 'pc') {
    return (<>{children}</>);
  } else if (width <= 720 && on === 'mobile') {
    return (<></>);
  }
  return (<>{children}</>);
};

export type MediaQueryRefType = {
  hidden: boolean,
}

const rRef: MediaQueryRefType = {
  hidden: true,
};

export const changeWidth = (setFn: React.Dispatch<React.SetStateAction<number>>) => () => {
  window.addEventListener('resize', () => {
    setFn(window.innerWidth);
  });
};
export const useResize = (on: 'pc' | 'mobile'): [() => void, MediaQueryRefType] => [() => {
  const width = window.innerWidth;
  if (width > 720 && on === 'pc') {
    rRef.hidden = false;
  } else if (width > 720 && on === 'mobile') {
    rRef.hidden = true;
  } else if (width <= 720 && on === 'pc') {
    rRef.hidden = true;
  } else if (width <= 720 && on === 'mobile') {
    rRef.hidden = false;
  }
}, rRef];
