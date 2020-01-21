import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ErrorBoundary from 'react-error-boundary';

import configureStore from './store/configureStore';
import WeatherContainer from './containers/WeatherContainer';

const store = configureStore();

const styles = () => ({
  main: {
    backgroundColor: 'beige',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  note: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    padding: '10px',
    maxWidth: '300px',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <ErrorBoundary className={classes.root}>
          <Provider store={store}>
            <div>
              <ErrorBoundary>
                <WeatherContainer />
              </ErrorBoundary>
            </div>
          </Provider>
        </ErrorBoundary>
      </main>
    );
  }
}

export default withStyles(styles)(App);
