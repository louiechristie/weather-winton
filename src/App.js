import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import WeatherWidget from './containers/WeatherContainer';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Weather Winton</h1>
          <p>A weather widget.</p>
          <WeatherWidget />
        </div>
      </Provider>
    );
  }
}

export default App;
