import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';
import user from './reducer-user';

const allReducers = combineReducers({
  flashMessages,
  user
});

export default allReducers;
