import { combineReducers } from 'redux';
import { items, itemsIsLoading, itemsHasErrored, error } from './items';

export default combineReducers({
  items,
  itemsIsLoading,
  itemsHasErrored,
  error
});
