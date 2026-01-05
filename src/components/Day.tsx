import React from 'react';

import { theme, Card, Box, Typography } from '../utilities/theme';
import { getTemperatureFriendly } from '../utilities/getRoomTemperatureComfortFromCelsius.mjs';
import { Item } from '@/utilities/transformMetOfficeJSON';
import { Temporal } from 'temporal-polyfill';

const styles: { [key: string]: React.CSSProperties } = {
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
  indicator: {
    fontSize: '0.6rem',
    lineHeight: '0.6rem',
  },
  temperature: {
    flex: 1,
    paddingTop: '4px',
    paddingBottom: '8px',
  },
  temperatureName: { fontSize: '1.2rem', fontWeight: 400 },
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
    color: 'black',
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

const getDayTempFriendlyStyle = (temperature: number) => {
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

const Day = (props: Item) => {
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
    averageTemperature,
    currentTemperature,
    stormName,
    isWindy,
  } = props;

  const minTempInt = Math.round(minTemperature);
  const maxTempInt = Math.round(maxTemperature);
  const timeZone = Temporal.Now.timeZoneId();
  const nowInstant = Temporal.Now.instant();
  const nowZoned = nowInstant.toZonedDateTimeISO(timeZone);
  const nowPlainDate = nowZoned.toPlainDate();
  const timeInstant = Temporal.Instant.from(time);
  const timeZoned = timeInstant.toZonedDateTimeISO(timeZone);
  const timePlainDate = timeZoned.toPlainDate();
  const isToday =
    nowPlainDate.toString() === timePlainDate.toString().toString();
  const averageTempInt = Math.round(averageTemperature);
  const currentTempInt = currentTemperature && Math.round(currentTemperature);

  const spacer = isToday ? 1 : 4;

  const getNumberForScale = (tempInt: number) => {
    const isDialTemp = isToday
      ? tempInt === currentTempInt
      : tempInt === averageTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    const temperatureNumberHTML = `${tempInt}\u00A0`;

    const dialTemperatureHtml = (
      <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>
        {temperatureNumberHTML}
      </span>
    );

    const otherTemperatures = <span>{temperatureNumberHTML}</span>;

    if (
      maxTempInt - minTempInt >= spacer ||
      minTempInt < 1 ||
      maxTempInt > 26
    ) {
      // If a decent temp change show range, or if unusually high/low show temp
      if (isDialTemp) return dialTemperatureHtml;
      if (isMinTemp) {
        return otherTemperatures;
      }
      if (isMaxTemp) {
        return otherTemperatures;
      }
      if (isDialTemp) {
        return dialTemperatureHtml;
      }
    } else {
      // Else show average only decent temp change
      if (isDialTemp) {
        return dialTemperatureHtml;
      }
    }

    if (tempInt % 10 === 0) {
      //temperature is a multiple of ten e.g. 0, 10, 20
      const isAwayFromAverageTemp =
        tempInt < averageTempInt - spacer || tempInt > averageTempInt + spacer;
      const isAwayFromMinTemp =
        tempInt < minTempInt - spacer || tempInt > minTempInt + spacer;
      const isAwayFromMaxTemp =
        tempInt < maxTempInt - spacer || tempInt > maxTempInt + spacer;
      const isBetween = tempInt > minTempInt && tempInt < maxTempInt;

      if (
        !isBetween &&
        isAwayFromAverageTemp &&
        isAwayFromMinTemp &&
        isAwayFromMaxTemp
      ) {
        return otherTemperatures;
      }
    }

    return '';
  };

  const getIndicator = (tempInt: number) => {
    const isCurrentTemp = tempInt === currentTempInt;
    const isAverageTemp = tempInt === averageTempInt;
    const isMinTemp = tempInt === minTempInt;
    const isMaxTemp = tempInt === maxTempInt;

    const indicatorHtml = <span style={{ fontSize: '1rem' }}>{'▲'}</span>;

    if (
      maxTempInt - minTempInt >= spacer ||
      minTempInt < 1 ||
      maxTempInt > 26
    ) {
      // If a decent temp change show range, or if unusually high/low show temp
      if (isToday && isCurrentTemp) {
        return indicatorHtml;
      }
      if (!isToday && isAverageTemp) return indicatorHtml;
      if (isMinTemp) return <span style={{}}>{'⇤'}</span>;
      if (isMaxTemp) return <span style={{}}>{'⇥'}</span>;
    } else {
      // Else show average only
      if (isToday && isCurrentTemp) return indicatorHtml;
      if (!isToday && isAverageTemp) return indicatorHtml;
    }

    return '';
  };

  // Temperatures and tally of days ever had that temperature in UK
  // Previously calculated using command line utility /data/daily/daily.js
  const tempTallies: { [key: number]: number } = {
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

  const temperatures: string[] = Object.keys(tempTallies).sort(function (
    a: string,
    b: string
  ) {
    return Number(a) - Number(b);
  });

  const isOffTheScaleHot =
    Math.round(maxTemperature) >
    parseInt(temperatures[temperatures.length - 1], 10);

  const isOffTheScaleCold =
    Math.round(minTemperature) < parseInt(temperatures[0], 10);

  return (
    <Card key={time}>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <div>
        <Typography variant="h5" component="h2" style={styles.friendlyDate}>
          {friendlyDate}
        </Typography>
        <Typography variant="h6" component="p" style={{ display: 'none' }}>
          Time: {time}
        </Typography>
      </div>
      <div>
        <img
          style={styles.svgIcon}
          src={icon}
          alt={description}
          fetchPriority={isToday ? 'high' : 'auto'}
        />
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
          {isWindy && <div style={styles.label}>Windy 🌬️</div>}

          {stormName && <div style={styles.label}>Storm {stormName} 🌬️</div>}

          <div style={styles.temperatureOuter}>
            <Box style={{ ...styles.swatch, flex: 1 }}>
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
                ...getDayTempFriendlyStyle(averageTempInt),
              }}
            >
              <Box style={styles.colorScale}>
                {temperatures.map((key) => {
                  const tempInt = parseInt(key, 10);
                  const tally = tempTallies[tempInt];

                  return (
                    <Box
                      key={key}
                      style={{
                        ...styles.swatch,
                        ...getDayTempFriendlyStyle(tempInt),
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
                <Typography
                  variant="body1"
                  component="p"
                  style={styles.temperatureName}
                >
                  {getTemperatureFriendly(averageTempInt)}
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
