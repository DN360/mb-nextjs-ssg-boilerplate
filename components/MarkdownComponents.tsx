import React from 'react';
import classes from '../styles/MarkdownComponents.module.scss';

export const ArticleImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <img {...props} className={classes.articleImg} />
  );
};
