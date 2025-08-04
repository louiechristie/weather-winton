import axios from 'axios';

let pancakeDayDate;

const isItPancakeDayAPI =
  'https://api.isitpancakeday.com/?format=json&daysuntil';

try {
  // Get pancake day date once on initialisation
  const isItPancakeDayResponse = await axios.get(isItPancakeDayAPI, {
    timeout: 5000,
  });

  pancakeDayDate = isItPancakeDayResponse?.data?.next_pancakeday?.date;
} catch (error) {
  console.error('Failed to fetch pancake day:', error);
}

// Use closure to return cached pancake day date to avoid api limits (this may not be necessary if using http and not https)
const getPancakeDayDate = () => {
  return pancakeDayDate;
};

export default getPancakeDayDate;
