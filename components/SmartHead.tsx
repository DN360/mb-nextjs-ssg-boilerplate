import React from 'react';
import Head from 'next/head';

export const SmartHead: React.FC<{
  title?: string;
  description?: string;
  type?: 'website' | 'article',
  uri?: string,
  baseurl?: string
}> = ({title, description, type, uri, baseurl} = {
  title: 'mb-nextjs-ssg-boilerplate',
  description: 'ssg with nextjs customized by monbrand',
  type: 'website',
  uri: '',
  baseurl: "http://localhost:3000"
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="baseurl" content={baseurl}/>
      <meta charSet="utf-8"/>
      <meta property="og:url" content={baseurl + uri}/>
      <meta property="og:title" content={title}/>
      <meta name="description" content={description}/>
      <meta property="og:description" content={description}/>
      <meta property="og:type" content={type}/>
      <meta name="twitter:card" content="summary"/>
      <meta property="og:site_name" content={title}/>
      <meta property="og:locale" content="ja_JP"/>
    </Head>
  );
};
