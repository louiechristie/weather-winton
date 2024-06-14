import React from 'react';

import { theme, Box, Card, Typography } from '../utilities/theme.mjs';
import { getTemperatureFriendly } from '../utilities/getRoomTemperatureComfortFromCelsius.mjs';

const styles = {
  card: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    boxSizing: 'border-box',
    minWidth: 300,
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  friendlyDate: {},
  svgIcon: {
    width: 48 * 2,
    height: 48 * 2,
  },
  description: {
    paddingTop: 0,
    marginBottom: theme.spacing(1),
  },
  labels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: theme.spacing(1),
    fontSize: '1rem',
    borderRadius: 20,
  },
  temperatureOuter: {
    width: '100%',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  temperatureContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 250,
    borderRadius: '20px 20px 0 0',
  },
  colorScale: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  scaleNumber: {
    fontSize: '0.8rem',
  },
  indicator: {
    fontSize: '0.6rem',
    lineHeight: '0.6rem',
  },
  temperature: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  swatch: {},
  freezingSwatch: {
    flex: 18035,
  },
  coldSwatch: {
    flex: 64146,
  },
  warmSwatch: {
    flex: 9975,
  },
  hotSwatch: {
    flex: 11,
  },
  warm: {
    color: 'rgba(0,0,0, 0.7)',
    borderWidth: 0,
    backgroundColor: '#f1d220',
  },
  hot: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#cc0605',
  },
  cold: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#0075c4',
  },
  freezing: {
    color: 'white',
    borderWidth: 0,
    backgroundColor: '#004a93',
  },
  dry: {
    color: '#cc0605',
    borderColor: '#cc0605',
    backgroundColor: 'white',
  },
  sticky: {
    color: '#3F51B5',
    borderColor: '#3F51B5',
  },
  // emoji: {
  //   textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white',
  // }
};

const Day = (props) => {
  const {
    friendlyDate,
    time,
    icon,
    description,
    minTemperature,
    maxTemperature,
    isSticky,
    isDry,
    isTakeRaincoat,
    isSnowDay,
    indicativeTemperature,
    currentTemperature,
  } = props;

  const minTempInt = Math.round(minTemperature);
  const maxTempInt = Math.round(maxTemperature);
  const isToday = friendlyDate === 'Today';
  const indicativeTempInt = Math.round(indicativeTemperature);
  const currentTempInt = currentTemperature && Math.round(currentTemperature);

  const getTempFriendlyStyle = (temperature) => {
    if (getTemperatureFriendly(temperature) === 'Hot 🥵') {
      return styles.hot;
    }
    if (getTemperatureFriendly(temperature) === 'Warm') {
      return styles.warm;
    }
    if (getTemperatureFriendly(temperature) === 'Cold') {
      return styles.cold;
    }
    if (getTemperatureFriendly(temperature) === 'Freezing 🥶') {
      return styles.freezing;
    }
  };

  const spacer = isToday ? 1 : 4;

  const getNumberForScale = (tempInt) => {
    const isDialTemp = isToday
      ? tempInt === currentTempInt
      : tempInt === indicativeTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    const temperatureNumberHTML = `${tempInt}\u00A0`;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      if (isDialTemp) return temperatureNumberHTML;
      if (isMinTemp) return temperatureNumberHTML;
      if (isMaxTemp) return temperatureNumberHTML;
      if (isDialTemp) return temperatureNumberHTML;
    } else {
      // Else show indicative only decent temp change
      if (isDialTemp) return temperatureNumberHTML;
    }

    if (tempInt % 10 === 0) {
      //temperature is a multiple of ten e.g. 0, 10, 20
      const isAwayFromIndicativeTemp =
        tempInt < indicativeTempInt - spacer ||
        tempInt > indicativeTempInt + spacer;
      const isAwayFromMinTemp =
        tempInt < minTempInt - spacer || tempInt > minTempInt + spacer;
      const isAwayFromMaxTemp =
        tempInt < maxTempInt - spacer || tempInt > maxTempInt + spacer;
      const isBetween = tempInt > minTempInt && tempInt < maxTempInt;

      if (
        !isBetween &&
        isAwayFromIndicativeTemp &&
        isAwayFromMinTemp &&
        isAwayFromMaxTemp
      )
        return <spam style={{ opacity: 0.75 }}>{temperatureNumberHTML}</spam>;
    }

    return '';
  };

  const getIndicator = (tempInt) => {
    const isCurrentTemp = tempInt === currentTempInt;
    const isIndicativeTemp = tempInt === indicativeTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    if (maxTempInt - minTempInt >= spacer) {
      // If a decent temp change show range
      if (isToday && isCurrentTemp) return '▲';
      if (!isToday && isIndicativeTemp) return '▲';
      if (isMinTemp) return '⇤';
      if (isMaxTemp) return '⇥';
    } else {
      // Else show indicative only
      if (isToday && isCurrentTemp) return '▲';
      if (!isToday && isIndicativeTemp) return '▲';
    }

    return '';
  };

  // Temperatures and tally of days ever had that temperature in UK
  // Previously calculated using command line utility /data/daily/daily.js
  const tempTallies = {
    0: 40972,
    1: 59690,
    2: 73070,
    3: 92082,
    4: 108816,
    5: 125365,
    6: 135230,
    7: 142920,
    8: 137429,
    9: 133162,
    10: 127651,
    11: 120447,
    12: 119725,
    13: 132029,
    14: 142536,
    15: 132340,
    16: 111931,
    17: 83007,
    18: 55343,
    19: 32912,
    20: 18501,
    21: 9511,
    22: 5011,
    23: 2440,
    24: 1065,
    25: 697,
    26: 354,
    27: 205,
    28: 155,
    29: 97,
    30: 43,
    31: 19,
    32: 7,
    33: 7,
    34: 1,
    35: 0.1,
    36: 0.1,
    37: 0.1,
    38: 0.1,
    39: 0.1,
    '-16': 1,
    '-14': 1,
    '-13': 11,
    '-12': 32,
    '-11': 38,
    '-10': 20,
    '-9': 155,
    '-8': 490,
    '-7': 1044,
    '-6': 1407,
    '-5': 2559,
    '-4': 5620,
    '-3': 9790,
    '-2': 15313,
    '-1': 27092,
  };

  const temperatures = Object.keys(tempTallies).sort(function (a, b) {
    return a - b;
  });

  const isOffTheScaleHot =
    Math.round(maxTemperature) >
    parseInt(temperatures[temperatures.length - 1], 10);

  const isOffTheScaleCold =
    Math.round(minTemperature) < parseInt(temperatures[0], 10);

  return (
    <Card key={time} style={styles.card} align="center">
      <div>
        <Typography variant="h5" component="h2" style={styles.friendlyDate}>
          {friendlyDate}
        </Typography>
        {/* 
          <Typography variant="h6" component="p">
            Time: {time}
          </Typography> 
        */}
      </div>
      <div>
        <img style={styles.svgIcon} src={icon} alt={description} />
        <Typography style={styles.description} variant="h6" component="p">
          {description}
        </Typography>
      </div>
      <div>
        <Box style={styles.labels}>
          {isSticky && <div style={styles.label}>Sticky 💦</div>}

          {isDry && (
            <div style={{ ...styles.label, ...styles.dry }}>
              Dry eyes/skin 👁
            </div>
          )}
          {(isOffTheScaleHot || isOffTheScaleCold) && (
            <div style={styles.label}>{`Off the scale ${
              isOffTheScaleHot ? 'hot 🥵' : 'cold 🥶'
            }`}</div>
          )}
          {isTakeRaincoat && <div style={styles.label}>Take raincoat 🧥</div>}
          {isSnowDay && <div style={styles.label}>Snow ❄️☃️</div>}
          <div style={styles.temperatureOuter}>
            <Box style={{ ...styles.swatch, ...minTemperature, flex: 1 }}>
              <div style={styles.scaleNumber}>
                {isOffTheScaleCold && getNumberForScale(minTempInt)}{' '}
              </div>

              {(isOffTheScaleCold || isOffTheScaleHot) && (
                <div style={{ ...styles.indicator, minWidth: '20px' }}>
                  <Typography variant="body2" component="p">
                    {isOffTheScaleCold && getIndicator(minTempInt)}
                    {'\u00A0'}
                  </Typography>
                </div>
              )}
            </Box>

            <Box
              style={{
                ...styles.temperatureContainer,
                ...getTempFriendlyStyle(indicativeTempInt),
              }}
            >
              <Box style={styles.colorScale}>
                {temperatures.map((key) => {
                  const tempInt = parseInt(key, 10);
                  const tally = tempTallies[key];

                  return (
                    <Box
                      key={key}
                      style={{
                        ...styles.swatch,
                        ...getTempFriendlyStyle(tempInt),
                        flex: tally,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={styles.scaleNumber}>
                        {getNumberForScale(tempInt)}
                      </div>
                      <div style={styles.indicator}>
                        {getIndicator(tempInt)}
                      </div>
                    </Box>
                  );
                })}
              </Box>
              <Box style={styles.temperature}>
                <Typography variant="body1" component="p">
                  {getTemperatureFriendly(indicativeTempInt)}
                </Typography>
              </Box>
            </Box>

            <Box style={{ ...styles.swatch, flex: 1 }}>
              <div style={styles.scaleNumber}>
                {isOffTheScaleHot && getNumberForScale(maxTempInt)}
              </div>

              {(isOffTheScaleHot || isOffTheScaleCold) && (
                <div style={{ ...styles.indicator, minWidth: '20px' }}>
                  {'\u00A0'}
                  {isOffTheScaleHot && getIndicator(maxTempInt)}
                </div>
              )}
            </Box>
          </div>
        </Box>
      </div>
    </Card>
  );
};

export default Day;
