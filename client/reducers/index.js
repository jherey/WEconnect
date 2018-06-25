import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';
import businesses from './reducer-businesses';
import currentUser from './currentUser';
import currentBusiness from './reducer-currentBusiness';
import reviews from './reducer-reviews';
import searchResults from './reducer-search';
import userBusinesses from './userBusinesses';
import isLoading from './reducer-loading';
import paginate from './pagination';
import uploadProgress from './reducer-uploadProgress';

const allReducers = combineReducers({
  flashMessages,
  currentUser,
  authUser,
  uploadProgress,
  businesses,
  paginate,
  currentBusiness,
  reviews,
  userBusinesses,
  searchResults,
  isLoading
});

export default allReducers;
