import dayjs from 'dayjs';
import formattedDateFromISODate from './formattedDateFromISODate';

export function getDescriptionFromMetOfficeWeatherCode(code) {
  const weatherTypes = {
    NA: 'Not available',
    '0': 'Clear night',
    '1': 'Sunny day',
    '2': 'Partly cloudy (night)',
    '3': 'Partly cloudy (day)',
    '4': 'Not used',
    '5': 'Mist',
    '6': 'Fog',
    '7': 'Cloudy',
    '8': 'Overcast',
    '9': 'Light rain shower (night)',
    '10': 'Light rain shower (day)',
    '11': 'Drizzle',
    '12': 'Light rain',
    '13': 'Heavy rain shower (night)',
    '14': 'Heavy rain shower (day)',
    '15': 'Heavy rain',
    '16': 'Sleet shower (night)',
    '17': 'Sleet shower (day)',
    '18': 'Sleet',
    '19': 'Hail shower (night)',
    '20': 'Hail shower (day)',
    '21': 'Hail',
    '22': 'Light snow shower (night)',
    '23': 'Light snow shower (day)',
    '24': 'Light snow',
    '25': 'Heavy snow shower (night)',
    '26': 'Heavy snow shower (day)',
    '27': 'Heavy snow',
    '28': 'Thunder shower (night)',
    '29': 'Thunder shower (day)',
    '30': 'Thunder'
  };

  return weatherTypes[code];
}

export function getEmojiFromMetOfficeWeatherCode(code) {
  const weatherTypes = {
    NA:
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/NA.svg',
    '0':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/0.svg',
    '1':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/1.svg',
    '2':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/2.svg',
    '3':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/3.svg',
    '4':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/4.svg',
    '5':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/5.svg',
    '6':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/6.svg',
    '7':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg',
    '8':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg',
    '9':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/9.svg',
    '10':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/10.svg',
    '11':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/11.svg',
    '12':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg',
    '13':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/13.svg',
    '14':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/14.svg',
    '15':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/15.svg',
    '16':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/16.svg',
    '17':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/17.svg',
    '18':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/18.svg',
    '19':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/19.svg',
    '20':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/20.svg',
    '21':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/21.svg',
    '22':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/22.svg',
    '23':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/23.svg',
    '24':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/24.svg',
    '25':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/25.svg',
    '26':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/26.svg',
    '27':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/27.svg',
    '28':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/28.svg',
    '29':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/29.svg',
    '30':
      'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/30.svg'
  };

  return weatherTypes[code];
}

export function getItemsFromMetOfficeJSON(json) {
  const items = json.features[0].properties.timeSeries
    .filter(day => !dayjs(day.time).isBefore(dayjs()))
    .map(day => {
      return {
        date: formattedDateFromISODate(day.time),
        description: getDescriptionFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        icon: getEmojiFromMetOfficeWeatherCode(
          day.daySignificantWeatherCode.toString()
        ),
        temperature: Math.round(day.dayMaxScreenTemperature)
      };
    });

  return items;
}
