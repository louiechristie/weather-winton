import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import { itemsFetchData } from '../actions/items';
import WeatherWidget from '../components/WeatherWidget';
import { getEmojiFromMetOfficeWeatherCode } from '../utilities/metOfficeWeatherUtils';

class ItemList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;

    fetchData(process.env.REACT_APP_API_URL || 'test-data.json', {
      // 'x-ibm-client-id': process.env.REACT_APP_CLIENT_ID,
    });
  }

  render() {
    const { items, isLoading, hasErrored, error } = this.props;
    if (hasErrored) {
      return (
        <div>
          <WeatherWidget
            items={[
              {
                date: 'Tomorrow',
                description: 'Probably cloudy',
                icon: getEmojiFromMetOfficeWeatherCode(7),
                temperature: null
              },
              {
                date: 'Sorry, problem getting forecast.',
                description: `${error}`,
                icon: getEmojiFromMetOfficeWeatherCode(30),
                temperature: null
              }
            ]}
          />
        </div>
      );
    }

    if (isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <ErrorBoundary>
        <WeatherWidget items={items} />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    isLoading: state.itemsIsLoading,
    hasErrored: state.itemsHasErrored,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
