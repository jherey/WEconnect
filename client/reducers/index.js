import { combineReducers } from 'redux';
import flashMessages from './reducer-flashMessages';

const allReducers = combineReducers({
  flashMessages
});

export default allReducers;
