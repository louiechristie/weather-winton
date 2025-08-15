let pancakeDayDate;

const isItPancakeDayAPI =
  'http://api.isitpancakeday.com/?format=json&daysuntil';

const getPancakeDayDate = async () => {
  if (pancakeDayDate) {
    return pancakeDayDate;
  } else {
    try {
      // Get pancake day date once
      const isItPancakeDayResponse = await fetch(isItPancakeDayAPI, {
        signal: AbortSignal.timeout(5000),
      });

      pancakeDayDate = isItPancakeDayResponse?.data?.next_pancakeday?.date;
    } catch (error) {
      console.error('Failed to fetch pancake day:', error);
    }
  }
  return pancakeDayDate;
};

export default getPancakeDayDate;
