import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import manifest from 'package.json' with { type: 'json' };
import type Meta from '@/types/meta';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

const { title, description, author, version } = manifest;

const now = dayjs();
const nowTimeStamp = now.toISOString();

const CLOUDY_IMAGE_SRC =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg';
const PROBABLY_RAINING = 'Probably Raining';

const meta: Meta = {
  siteTitle: title,
  siteDescription: description,
  siteUrl: process.env.GATSBY_SITE_URL,
  monetization: `$ilp.gatehub.net/484331722`,
  author,
  version,
  timeStamp: nowTimeStamp,
  todaysWeather: PROBABLY_RAINING,
  location: 'South London',
  ogImage: `og-image-${dayjs().tz().format('YYYY-MM-DD-HH')}.png`,
  image: CLOUDY_IMAGE_SRC,
};

export default meta;
