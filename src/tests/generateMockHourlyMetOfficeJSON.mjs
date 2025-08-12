import dayjs from 'dayjs';
import hourly from './hourly.json' with { type: 'json' };

const getMockMetOfficeJSON = (
  startTime = hourly.features[0].properties.timeSeries[0].time
) => {
  const startTimeDayJS = dayjs(startTime).startOf('hour');

  let hour = -2;

  const getMockDate = () => {
    hour++;
    return startTimeDayJS.add(hour, 'hour').format('YYYY-MM-DDTHH:mm[Z]');
  };

  const mockMetOfficeJSON = structuredClone(hourly);

  let timeSeries = mockMetOfficeJSON.features[0].properties.timeSeries;

  const generatedTimeSeries = timeSeries.map(
    (hour) => (hour.time = getMockDate())
  );

  timeSeries = generatedTimeSeries;

  return structuredClone(mockMetOfficeJSON);
};

export default getMockMetOfficeJSON;
