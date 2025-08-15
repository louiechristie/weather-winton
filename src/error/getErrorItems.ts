import meta from '@/utilities/meta/meta';

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg';
const PROBABLY_RAINING = 'Probably Raining';

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
      description: PROBABLY_RAINING,
      icon: CLOUDY_IMAGE_SRC,
    },
    {
      friendlyDate: 'Sorry, problem getting forecast.',
      time: meta.timeStamp,
      description: `${error}`,
      icon: CLOUDY_IMAGE_SRC,
    },
  ];
  return errorDisplayItems;
};

export default getErrorItems;
