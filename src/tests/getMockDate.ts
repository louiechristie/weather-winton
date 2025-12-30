import dayjs from 'dayjs';

let offset: number = -2;
let start: dayjs.Dayjs | null = null;

const getMockDate = (time?: string) => {
  if (time) {
    start = dayjs(time);
  }
  let ret: string;
  if (time) {
    offset = -2;
  }
  offset++;
  if (start) {
    ret = start
      .add(offset, 'hour')
      .startOf('hour')
      .format('YYYY-MM-DDTHH:mm[Z]');
  } else {
    ret = dayjs()
      .add(offset, 'hour')
      .startOf('hour')
      .format('YYYY-MM-DDTHH:mm[Z]');
  }

  return ret;
};

export const getDateAt11PM = () => {
  const dateAt11PM = dayjs().hour(23).minute(0).second(0).millisecond(0);

  return dateAt11PM.toISOString();
};

export default getMockDate;
