import unified from 'unified';
import parser from 'remark-parse';
import r2r from 'remark-react';
import gfm from 'remark-gfm';
import {ArticleImg} from 'components/MarkdownComponents';

export const parseStaffDetail = (rawMD) => {
  return unified()
      .use(parser)
      .use(gfm)
      .use(r2r)
      .processSync(rawMD).result;
};

export const parseArticle = (rawMD) => {
  return unified()
      .use(parser)
      .use(gfm)
      .use(r2r, {
        remarkReactComponents: {
          img: ArticleImg,
        },
      })
      .processSync(rawMD).result;
};
