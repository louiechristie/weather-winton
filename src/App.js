import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import configureStore from './store/configureStore';
import WeatherContainer from './containers/WeatherContainer';
import SimpleAppBar from './components/SimpleAppBar';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <div>
            <SimpleAppBar title="Weather Widget" />

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
