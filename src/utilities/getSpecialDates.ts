import dayjs from 'dayjs';
import Holidays from 'date-holidays';
import { Temporal } from 'temporal-polyfill';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import getPancakeDayDate from './date/getPancakeDay';
import SpecialDate from '@/types/specialDate';
import { BankHoliday } from '@/types/bankHolidays';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');
dayjs.extend(customParseFormat);

const bankHolidaysAPI = 'https://www.gov.uk/bank-holidays.json';

const isThisYearOrIsNextYearEarlyJanuary = (
  bankHoliday: BankHoliday
): boolean => {
  const govDateString = bankHoliday.date;
  const isSameYear = dayjs().isSame(govDateString, 'year');
  const isNextYear = dayjs().add(1, 'year').isSame(govDateString, 'year');
  let isNextYearEarlyJanuary;
  if (isNextYear) {
    const isJanuary = dayjs(govDateString).month() === 1 - 1;
    const day = dayjs(govDateString).day();
    const isEarlyInMonth = day < 8;
    isNextYearEarlyJanuary = isNextYear && isJanuary && isEarlyInMonth;
  }

  if (isSameYear || isNextYearEarlyJanuary) {
    return true;
  }
  return false;
};

const getSpecialDates = async (): Promise<SpecialDate[]> => {
  let specialDates = [];
  type MergedDates = {
    [key: string]: string;
  };
  const mergedDates: MergedDates = {};

  const today = dayjs();

  /* in days months are zero indexed */
  // First week of January dates add 1 year to current date
  const funDates = [
    {
      date: dayjs()
        .year(today.year() + 1)
        .month(1 - 1)
        .date(1),
      name: "New Year's Day",
    },
    // Feb
    {
      date: dayjs()
        .month(2 - 1)
        .date(14),
      name: 'Valentines Day ❤️',
    },
    {
      date: dayjs()
        .month(4 - 1)
        .date(1),
      name: 'April fools day 🤹',
    },
    {
      date: dayjs()
        .month(3 - 1)
        .date(17),
      name: "Saint Patrick's Day ☘️",
    },

    // April
    {
      date: dayjs()
        .month(4 - 1)
        .date(22),
      name: '22nd April 🥳',
    },

    // June
    {
      date: dayjs()
        .month(6 - 1)
        .date(27),
      name: '27th June 🎉',
    },

    // November - Thanksgiving (4th Thursday)
    {
      date: dayjs(
        Temporal.Now.plainDateISO()
          .with({ month: 11, day: 1 })
          .add({
            days:
              (7 +
                4 -
                Temporal.Now.plainDateISO().with({ month: 11, day: 1 })
                  .dayOfWeek) %
              7,
          })
          .add({ weeks: 3 })
          .toString()
      ),
      name: 'Thanksgiving 🦃',
    },

    // December
    {
      date: dayjs()
        .month(12 - 1)
        .date(25),
      name: 'Christmas 🎄',
    },
    {
      date: dayjs()
        .month(12 - 1)
        .date(31),
      name: "New Year's Eve 🎉",
    },
  ];

  /*
   * Add Holidays
   */

  const hd = new Holidays('GB');
  const holidays = hd.getHolidays(dayjs().year());

  holidays.forEach((holiday) => {
    const date = dayjs(holiday.start).tz().format('YYYY-MM-DD');
    mergedDates[date] = holiday.name;
  });

  /*
   * Add Bank Holidays
   */

  try {
    const bankHolidaysResponse = await fetch(bankHolidaysAPI);
    const bankHolidaysResponseJson = await bankHolidaysResponse.json();

    const bankHolidays: BankHoliday[] =
      await bankHolidaysResponseJson['england-and-wales']?.events;
    const bankHolidaysFiltered = bankHolidays.filter(
      isThisYearOrIsNextYearEarlyJanuary
    );
    bankHolidaysFiltered.forEach((bankHoliday) => {
      mergedDates[bankHoliday.date] = bankHoliday.title;
    });
  } catch (error) {
    console.error(
      `Can't fetch bank holidays from ${bankHolidaysAPI}. Error: ${error}`
    );
  }

  // Modify holidays
  const mothersDay = holidays.find(
    (holiday) => holiday.name === "Mother's Day"
  );
  if (mothersDay) {
    mergedDates[dayjs(mothersDay.start).tz().format('YYYY-MM-DD')] =
      "Mother's Day 💐";
  }

  const easter = holidays.find((holiday) => holiday.name === 'Easter Sunday');
  if (easter) {
    mergedDates[dayjs(easter.start).tz().format('YYYY-MM-DD')] =
      'Easter Sunday 🐣';
  }

  const boxingDay = holidays.find((holiday) => holiday.name === 'Boxing Day');
  if (boxingDay) {
    mergedDates[dayjs(boxingDay.start).tz().format('YYYY-MM-DD')] =
      "Boxing Day /\n St Stephen's";
  }

  /*
   * Add fun dates
   */

  funDates.forEach((funDate) => {
    mergedDates[funDate.date.format('YYYY-MM-DD')] = funDate.name;
  });

  /*
   * Add Pancake day
   */

  let pancakeDayDate;
  const thisYear = dayjs().year();
  const pancakeDayDateThisYear = getPancakeDayDate(thisYear).toString();
  if (dayjs(pancakeDayDateThisYear, 'YYYY-MM-DD').isBefore(today)) {
    pancakeDayDate = getPancakeDayDate(dayjs().add(1, 'year').year());
  } else {
    pancakeDayDate = pancakeDayDateThisYear;
  }
  const pancakeDayDateFormatted = pancakeDayDate.toString();
  mergedDates[pancakeDayDateFormatted] = 'Pancake Day 🥞';

  specialDates = Object.keys(mergedDates)
    .toSorted()
    .map((key) => {
      return {
        date: dayjs(key, 'YYYY-MM-DD').tz().startOf('day'),
        name: mergedDates[key],
      };
    });

  return specialDates;
};

export default getSpecialDates;
