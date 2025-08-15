import Head from 'next/head';
import React from 'react';
import Meta from '@/types/meta';

interface Props {
  meta: Meta;
}

const CustomHead = (props: Props) => {
  const { meta } = props;

  const {
    siteTitle,
    siteDescription,
    siteUrl,
    monetization,
    // author: { name, url },
    // version,
    // timeStamp,
    todaysWeather,
    location,
    // ogImage,
  } = meta;

  const generatedTitle = `${todaysWeather} | ${location} | ${siteTitle}`;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{generatedTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta
        property="og:title"
        content={`${todaysWeather} in ${location} | ${siteTitle}`}
      />
      <meta property="og:description" content={siteDescription} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta name="twitter:card" content="summary" />
      <meta name="monetization" content={monetization} />
    </Head>
  );
};

export default CustomHead;
