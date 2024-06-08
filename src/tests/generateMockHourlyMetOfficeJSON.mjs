import dayjs from 'dayjs';
import hourly from './hourly.json' assert { type: 'json' };

const startTime = dayjs(hourly.features[0].properties.timeSeries[0].time);

let hour = -2;

const getMockDate = () => {
  hour++;
  return startTime.add(hour, 'hour').format('YYYY-MM-DDTHH:mm[Z]');
};

const mockMetOfficeJSON = structuredClone(hourly);

let timeSeries = mockMetOfficeJSON.features[0].properties.timeSeries;

const generatedTimeSeries = timeSeries.map((hour) => {
  hour.time = getMockDate();
});

timeSeries = generatedTimeSeries;

const getMockMetOfficeJSON = () => structuredClone(mockMetOfficeJSON);

export default getMockMetOfficeJSON;
