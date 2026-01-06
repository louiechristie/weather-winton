import getIsWindy from './getIsWindy';

describe('Is windy?', () => {
  it('is windy when over 30 km/h (8.333333 m/s)', () => {
    expect(getIsWindy(8.333334)).toEqual(true);
  });
});
