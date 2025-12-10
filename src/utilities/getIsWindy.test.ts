import getIsWindy from './getIsWindy';

describe('Is windy?', () => {
  it('is windy when gusts over 30 km/h', () => {
    expect(getIsWindy(30)).toEqual(true);
  });
});
