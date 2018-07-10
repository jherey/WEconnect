import { combineReducers } from 'redux';
import authUser from './userReducer';
import businesses from './businessReducer';
import reviews from './reviewReducer';

const allReducers = combineReducers({
  authUser,
  businesses,
  reviews,
});

export default allReducers;
