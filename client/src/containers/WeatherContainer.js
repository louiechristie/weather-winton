import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';

import { itemsFetchData } from '../actions/items';
import meta from '../../package.json';

import SimpleAppBar from '../components/SimpleAppBar';
import WeatherWidget from '../components/WeatherWidget';
import Footer from '../components/Footer';

const cloudyImageSrc =
  'https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg';
const probablyCloudy = 'Probably Cloudy';

class ItemList extends Component {
  componentDidMount() {
    const { fetchData } = this.props;

    fetchData(process.env.REACT_APP_API_URL, {});
  }

  render() {
    const { items, isLoading, hasErrored, error } = this.props;
    if (hasErrored) {
      return (
        <div>
          <WeatherWidget
            items={[
              {
                date: 'Today',
                description: probablyCloudy,
                icon: cloudyImageSrc,
                temperature: null,
              },
              {
                date: 'Sorry, problem getting forecast.',
                description: `${error}`,
                icon: cloudyImageSrc,
                temperature: null,
              },
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
        <SimpleAppBar
          title={meta.description}
          image={(items && items[0] && items[0].icon) || cloudyImageSrc}
          alt={(items && items[0] && items[0].description) || probablyCloudy}
        />

        <WeatherWidget items={items} />

        <Footer meta={meta} />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    isLoading: state.itemsIsLoading,
    hasErrored: state.itemsHasErrored,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
