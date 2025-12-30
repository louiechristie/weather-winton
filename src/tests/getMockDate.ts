import dayjs from 'dayjs';

let hour: number = -2;

const getMockDate = (time?: string) => {
  const start: dayjs.Dayjs = time ? dayjs(time) : dayjs();
  if (time) {
    hour = -2;
  }
  hour++;
  const ret: string = start.startOf('hour').add(hour, 'hour').toISOString();

  return ret;
};

export const getDateAt11PM = () => {
  const dateAt11PM = dayjs().hour(23).minute(0).second(0).millisecond(0);

  return dateAt11PM.toISOString();
};

export default getMockDate;
