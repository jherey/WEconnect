import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';
import businesses from './reducer-businesses';
import currentBusiness from './reducer-currentBusiness';

const allReducers = combineReducers({
  flashMessages,
  authUser,
  businesses,
  currentBusiness
});

export default allReducers;
