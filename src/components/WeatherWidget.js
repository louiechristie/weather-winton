import React, { Component } from 'react';

class WeatherWidget extends Component {
  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map(item => (
          <li key={item.date_epoch}>
            <h2>{item.date_epoch}</h2>
            <div>
              <img
                src={item.day.condition.icon}
                alt={item.day.condition.text}
              />
            </div>
            <div>{item.day.condition.text}</div>
            <div>{item.day.avgtemp_c}°C</div>
          </li>
        ))}
      </ul>
    );
  }
}

export default WeatherWidget;

// "condition": {
//     "text": "Partly cloudy",
//     "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
//     "code": 1003
//  },
