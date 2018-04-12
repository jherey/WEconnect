import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import authUser from './reducer-user';

const allReducers = combineReducers({
  flashMessages,
  authUser
});

export default allReducers;
