import meta from '@/utilities/meta/meta';

type ErrorItem = {
  friendlyDate: string;
  time: string;
  description: string;
  icon: string;
};

export type ErrorItems = ErrorItem[];

const getErrorItems = (error: string) => {
  const errorDisplayItems: ErrorItems = [
    {
      friendlyDate: 'Today',
      time: meta.timeStamp,
      description: meta.todaysWeather,
      icon: meta.image,
    },
    {
      friendlyDate: 'Sorry, problem getting forecast.',
      time: meta.timeStamp,
      description: `${error}`,
      icon: meta.image,
    },
  ];
  return errorDisplayItems;
};

export default getErrorItems;
