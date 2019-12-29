import { getItemsFromMetOfficeJSON } from '../utilities/metOfficeWeatherUtils';
import log from '../utilities/log';

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function itemsFetchDataError(error) {
  return {
    type: 'ITEMS_FETCH_DATA_ERROR',
    error
  };
}

export function itemsFetchData(url, headers) {
  return dispatch => {
    dispatch(itemsIsLoading(true));

    // eslint-disable-next-line no-undef
    fetch(url, {
      headers
    })
      .then(response => {
        log(`response: ${JSON.stringify(response)}`);

        if (!response) {
          throw new Error('No response from server.');
        }

        if (!response.ok) {
          throw new Error(JSON.stringify(response, null, '  '));
        }
        return response.json();
      })
      .then(json => {
        log(`json: ${JSON.stringify(json, null, '  ')}`);

        dispatch(itemsIsLoading(false));
        dispatch(itemsFetchDataSuccess(getItemsFromMetOfficeJSON(json)));
      })
      .catch(exception => {
        log(`exception: ${exception.message}`);
        dispatch(itemsIsLoading(false));
        dispatch(itemsHasErrored(true));
        dispatch(itemsFetchDataError(exception.message));
      });
  };
}
