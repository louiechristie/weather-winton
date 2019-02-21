import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header className="header">
            <h1>Weather Winton</h1>
            <p>A weather widget.</p>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
