import { Temporal } from 'temporal-polyfill';

// From https://www.rmg.co.uk/stories/time/when-easter
// and https://www.calendarbede.com/book/carter-easter-algorithm

// Algorithm to find the date of Easter
// An algorithm to find the date of Easter which is valid from 1900 to 2099 has been derived by Carter as follows:

// Calculate D="'225'" - 11(Y MOD 19).
const getEaster = (year: number): Temporal.PlainDate => {
  const Y = year;
  let D = 225 - 11 * (Y % 19);

  // If D is greater than 50 then subtract multiples of 30 until the resulting new value of D is
  // less than 51.

  if (D > 50) {
    while (D >= 51) {
      D = D - 30;
    }
  }

  // If D is greater than 48 subtract 1 from it.
  if (D > 48) {
    D = D - 1;
  }

  // Calculate E="'(Y" +' [Y/4] + D + 1) MOD 7. (NB Integer part of [Y/4])
  const E = (Y + Math.floor(Y / 4) + D + 1) % 7;

  // Calculate Q="'D +'" 7 - E.
  const Q = D + 7 - E;

  // If Q is less than 32 then Easter is in March. If Q is greater than 31 then Q - 31 is its date in April.
  if (Q < 32) {
    return Temporal.PlainDate.from({ year: Y, month: 3, day: Q });
  } else {
    return Temporal.PlainDate.from({ year: Y, month: 4, day: Q - 31 });
  }
};

export default getEaster;
