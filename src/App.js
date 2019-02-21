import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import configureStore from './store/configureStore';
import WeatherContainer from './containers/WeatherContainer';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <div>
            <h1>Weather Winton</h1>
            <p>A weather widget.</p>
            <ErrorBoundary>
              <WeatherContainer />
            </ErrorBoundary>
          </div>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
