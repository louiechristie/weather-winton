import { Temporal } from 'temporal-polyfill';

import manifest from 'package.json' with { type: 'json' };
import type Meta from '@/types/meta';

const { title, description, author, version } = manifest;

const now = Temporal.Now.zonedDateTimeISO();
const nowTimeStamp = now.toString();

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg';
const PROBABLY_RAINING = 'Probably Raining';

const meta: Meta = {
  siteTitle: title,
  siteDescription: description,
  siteUrl: process.env.BASE_URL,
  monetization: `$ilp.gatehub.net/484331722`,
  author,
  version,
  timeStamp: nowTimeStamp,
  todaysWeather: PROBABLY_RAINING,
  location: 'South London',
  ogImageDirectory: `/cold/12`,
  image: CLOUDY_IMAGE_SRC,
};

export default meta;
