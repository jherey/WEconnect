import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';
import businesses from './reducer-businesses';

const allReducers = combineReducers({
  flashMessages,
  authUser,
  businesses
});

export default allReducers;
