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
    ogImage,
    image,
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

      <meta name="twitter:card" content="summary" />
      <meta name="monetization" content={monetization} />
      <link id="favicon" rel="icon" sizes="any" href={image} />
      <link rel="mask-icon" href={image} color="DimGrey" />
      <meta property="og:title" content={generatedTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image" content={`${siteUrl}/${ogImage}`} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <link
        rel="apple-touch-icon"
        href={`${siteUrl}/apple-touch-icon.png?v=${ogImage}`}
      />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};

export default CustomHead;
