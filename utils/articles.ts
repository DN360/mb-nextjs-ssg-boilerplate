import * as fs from 'fs';
import * as path from 'path';

export type MiniArticle = {
    title: string;
    date: string;
    tags: string[];
    id: string;
    dotDate: string;
}

export type Article = MiniArticle & {
    main?: string;
}

const DIRNAME = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const articleDir = (() => {
  if (!fs.existsSync(path.join(process.cwd(), 'articles', DIRNAME))) {
    return path.join(process.cwd(), 'articles', 'dev');
  }
  return path.join(process.cwd(), 'articles', DIRNAME);
})();

export const getArticles = (): Article[] => {
  const filelist = fs.readdirSync(articleDir);
  const articles = filelist.map((file) => {
    const fileWithoutExt = file.split(/\..+?$/)[0];
    const metadata = fileWithoutExt.split('#');
    const [y, m, d] = metadata[0].split('-');
    const title = metadata[1];
    const tags = metadata.slice(2);
    const main = fs.readFileSync(path.join(articleDir, file), 'utf-8');
    return {
      date: `${y}年${m}月${d}日`, tags, title, main, sort: new Date(metadata[0]).getTime(),
      dotDate: `${y}.${m}.${d}`,
      id: metadata[0] + '_' + title,
    };
  }).sort((a, b) => a.sort > b.sort ? -1 : 1).map((data, id): Article => ({
    date: data.date,
    tags: data.tags,
    title: data.title,
    main: data.main,
    id: data.id,
    dotDate: data.dotDate,
  }));
  return articles;
};

export const getArticle = (id: string): Article => {
  console.log(id);
  const targetFileName = id.split('_')[0] + '#' + id.split('_').slice(1).join('_');
  const filelist = fs.readdirSync(articleDir);
  if (filelist.filter((x) => x.includes(targetFileName)).length === 0) {
    return null;
  }
  const targetFile = filelist.filter((x) => x.includes(targetFileName))[0];
  const fileWithoutExt = targetFile.split(/\..+?$/)[0];
  const metadata = fileWithoutExt.split('#');
  const [y, m, d] = metadata[0].split('-');
  const title = metadata[1];
  const tags = metadata.slice(2);
  const main = fs.readFileSync(path.join(articleDir, targetFile), 'utf-8');
  return {
    date: `${y}年${m}月${d}日`, tags, title, main, id: metadata[0] + '_' + title,
    dotDate: `${y}.${m}.${d}`,
  };
};

export const convertMiniArticle = (article: Article): MiniArticle => {
  return {
    date: article.date,
    tags: article.tags,
    title: article.title,
    id: article.id,
    dotDate: article.dotDate,
  };
};

export const convertShortArticle = (article: Article): MiniArticle => {
  return {
    date: article.date,
    tags: article.tags,
    title: article.title.length > 15 ? article.title.slice(0, 15) + '...' : article.title,
    id: article.id,
    dotDate: article.dotDate,
  };
};
