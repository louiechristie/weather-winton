import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import { itemsFetchData } from '../actions/items';
import WeatherWidget from '../components/WeatherWidget';

class ItemList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;

    fetchData(process.env.REACT_APP_API_URL, {
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
                icon: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg',
                temperature: null
              },
              {
                date: 'Sorry, problem getting forecast.',
                description: `${error}`,
                icon: 'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg',
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
