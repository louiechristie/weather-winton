import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import { itemsFetchData } from '../actions/items';
import WeatherWidget from '../components/WeatherWidget';

class ItemList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(
      'https://api.apixu.com/v1/forecast.json?key=6a1b5c2633e94966a0d172626192102&q=london&days=5'
    );
  }

  render() {
    const { items, hasErrored, isLoading } = this.props;
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
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
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
