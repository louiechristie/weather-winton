import dayjs from 'dayjs';

export const getIsHourInTheRemainingDay = (
  time,
  currentTime = dayjs().toISOString()
) => {
  const currentTimeDayJS = dayjs(currentTime);
  const timeToCheckDayJS = dayjs(time);

  const differenceFromCurrentTime = currentTimeDayJS.diff(
    timeToCheckDayJS,
    'minutes',
    true
  );
  const isSameDay = timeToCheckDayJS.isSame(currentTimeDayJS, 'day');
  const isHourInTheRemainingDay = isSameDay && differenceFromCurrentTime < 60;

  // const isDaytime =
  //   currentTimeDayJS.tz().hour() >= 9 && currentTimeDayJS.tz().hour() <= 19;

  // if (isDaytime) {
  //   return (
  //     isHourInTheRemainingDay &&
  //     timeToCheckDayJS.tz().hour() >= 9 &&
  //     timeToCheckDayJS.tz().hour() <= 19
  //   );
  // }
  // console.log({ time, currentTime, isHourInTheRemainingDay });
  return isHourInTheRemainingDay;
};
