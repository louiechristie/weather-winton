import dayjs from 'dayjs';

const now = dayjs();
let hour = -2;

const getMockDate = () => {
  hour++;
  return now.startOf('hour').add(hour, 'hour').toISOString();
};

export const getDateAt11PM = () => {
  const dateAt11PM = dayjs().hour(23).minute(0).second(0).millisecond(0);

  return dateAt11PM.toISOString();
};

export default getMockDate;
