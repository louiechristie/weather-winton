import dayjs from 'dayjs';

const now = dayjs();
let hour = -2;

const getMockDate = () => {
  hour++;
  return now.startOf('hour').add(hour, 'hour').toISOString();
};

export default getMockDate;
