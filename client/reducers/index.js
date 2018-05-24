import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';
import businesses from './reducer-businesses';
import currentUser from './currentUser';
import currentBusiness from './reducer-currentBusiness';
import reviews from './reducer-reviews';
import searchResults from './reducer-search';
import isLoading from './reducer-loading';
import uploadProgress from './reducer-uploadProgress';

const allReducers = combineReducers({
  flashMessages,
  currentUser,
  authUser,
  uploadProgress,
  businesses,
  currentBusiness,
  reviews,
  searchResults,
  isLoading
});

export default allReducers;
