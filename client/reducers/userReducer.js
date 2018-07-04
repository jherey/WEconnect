import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  EDIT_USER,
  SET_API_STATUS,
  SET_PROGRESS,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  uploadProgress: 0
};

/**
 * @returns {Object} newState
 * @param {*} state
 * @param {*} action
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case EDIT_USER:
      return {
        ...state,
        user: action.user
      };

    case SET_API_STATUS:
      return {
        ...state,
        isLoading: action.status
      };

    case SET_PROGRESS:
      return {
        ...state,
        uploadProgress: action.progress
      };

    default:
      return state;
  }
};
