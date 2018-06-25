import {
  ADD_BUSINESS,
  GET_BUSINESSES,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS
} from '../actions/types';

/**
 * @description - Business reduce
 * @param {*} state
 * @param {*} actio
 * @returns { business } - State
 */

const initialState = {
  businesses: [],
  userBusiness: [],
  currentBusiness: {},
  searchResults: [],
  count: 0,
};

/**
 * @param {*} state
 *
 * @param {*} action
 *
 * @returns {Object} all businesses
 */
export default function businesses(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BUSINESS:
      return {
        ...state,
        currentBusiness: action.business
      };

    case GET_BUSINESSES:
      return {
        ...state,
        businesses: action.businesses
      };

    case USER_BUSINESSES:
      return {
        ...state,
        userBusiness: action.businesses
      };

    case FOUND_BUSINESSES:
      return {
        ...state,
        searchResults: action.businesses
      };

    case CURRENT_BUSINESS:
      return {
        ...state,
        currentBusiness: action.business
      };

    default:
      return state;
  }
}
