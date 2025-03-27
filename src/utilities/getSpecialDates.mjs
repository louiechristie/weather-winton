import axios from 'axios';
import dayjs from 'dayjs';
import Holidays from 'date-holidays';

const isItPancakeDayAPI =
  'https://api.isitpancakeday.com/?format=json&daysuntil&recipe';

const bankHolidaysAPI = 'https://www.gov.uk/bank-holidays.json';

const getSpecialDates = async () => {
  let specialDates = [];

  try {
    const isItPancakeDayResponse = await axios.get(
      'https://api.isitpancakeday.com/?format=json&daysuntil&recipe'
    );
    const pancakeDayDate = dayjs(
      isItPancakeDayResponse?.data?.next_pancakeday?.date,
      'DD-MM-YYYY'
    );

    const bankHolidaysResponse = await axios.get(bankHolidaysAPI);

    const bankHolidays = bankHolidaysResponse.data['england-and-wales']?.events;

    const isThisYearOrIsNextYearEarlyJanuary = (bankHoliday) => {
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

    const bankHolidaysFiltered = bankHolidays.filter(
      isThisYearOrIsNextYearEarlyJanuary
    );

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

      // March
      { date: pancakeDayDate, name: 'Pancake Day 🥞' },
      {
        date: dayjs()
          .month(3 - 1)
          .date(17),
        name: "Saint Patrick's Day 🍀",
      },

      // April
      {
        date: dayjs()
          .month(4 - 1)
          .date(22),
        name: '🥳',
      },

      // June
      {
        date: dayjs()
          .month(6 - 1)
          .date(27),
        name: '🎉',
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

    const mergedDates = {};

    const hd = new Holidays('GB');

    const holidays = hd.getHolidays(dayjs().year());

    console.log('holidays: ', holidays);

    holidays.forEach((holiday) => {
      const date = dayjs(holiday.date).format('YYYY-MM-DD');
      mergedDates[date] = holiday.name;
    });

    bankHolidaysFiltered.forEach((bankHoliday) => {
      mergedDates[bankHoliday.date] = bankHoliday.title;
    });

    funDates.forEach((funDate) => {
      mergedDates[funDate.date.format('YYYY-MM-DD')] = funDate.name;
    });

    specialDates = Object.keys(mergedDates).map((key) => {
      return {
        date: dayjs(key, 'YYYY-MM-DD'),
        name: mergedDates[key],
      };
    });
  } catch (error) {
    console.error(
      `Can't fetch special days from ${isItPancakeDayAPI} or ${bankHolidaysAPI}. Error: ${error}`
    );
  }
  return specialDates;
};

export default getSpecialDates;
