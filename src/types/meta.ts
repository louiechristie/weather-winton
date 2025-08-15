type Meta = {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string | undefined;
  monetization: string;
  author: {
    name: string;
    url: string;
  };
  version: string;
  timeStamp: string;
  todaysWeather: string;
  location: string;
  ogImage: string;
  image: string;
};

export default Meta;
