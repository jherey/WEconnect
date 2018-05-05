import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';
import businesses from './reducer-businesses';
import currentBusiness from './reducer-currentBusiness';
import reviews from './reducer-reviews';
import searchResults from './reducer-search';
import isLoading from './reducer-loading';
import uploadProgress from './reducer-uploadProgress';
import allUsers from './reducer-allUsers';

const allReducers = combineReducers({
  allUsers,
  flashMessages,
  authUser,
  uploadProgress,
  businesses,
  currentBusiness,
  reviews,
  searchResults,
  isLoading
});

export default allReducers;
