import Head from 'next/head';
import React from 'react';
import Meta from '@/types/meta';
import { usePathname } from 'next/navigation';

interface Props {
  meta: Meta;
}

const CustomHead = (props: Props) => {
  const { meta } = props;
  const pathname = usePathname();

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
    ogImageDirectory,
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
      <link
        rel="canonical"
        href={
          pathname === `/`
            ? `https://weather.louiechristie.com`
            : `https://weather.louiechristie.com${pathname}`
        }
      />
      <link rel="preload" as="image" href={image} fetchPriority="high" />
      <meta name="twitter:card" content="summary" />
      <meta name="monetization" content={monetization} />
      <link rel="mask-icon" href={image} color="DimGrey" />
      <meta property="og:title" content={generatedTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta
        property="og:image"
        content={`${siteUrl}/${ogImageDirectory}/og-image.png`}
      />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <link
        rel="apple-touch-icon"
        href={`${siteUrl}/${ogImageDirectory}/apple-touch-icon.png`}
      />
      <link rel="icon" href={`${siteUrl}/${ogImageDirectory}/favicon.ico`} />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};

export default CustomHead;
