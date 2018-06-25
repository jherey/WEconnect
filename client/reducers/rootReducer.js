import { combineReducers } from 'redux';
import flashMessages from './flashMessageReducer';
import authUser from './userReducer';
import businesses from './businessReducer';
import reviews from './reviewReducer';

const allReducers = combineReducers({
  flashMessages,
  authUser,
  businesses,
  reviews,
});

export default allReducers;
