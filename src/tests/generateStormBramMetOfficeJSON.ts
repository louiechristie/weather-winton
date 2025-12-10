import stormForecastJSON from '../../data/storms/storm-bram.json' with { type: 'json' };

const generate = () => {
  return stormForecastJSON;
};

export default generate;
