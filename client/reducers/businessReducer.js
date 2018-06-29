import {
  ADD_BUSINESS,
  GET_BUSINESSES,
  AVERAGE_RATING,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS,
  SET_PAGINATION
} from '../actions/types';

/**
 * @description - Business reduce
 * @param {*} state
 * @param {*} actio
 * @returns { business } - State
 */

const initialState = {
  averageRating: 0,
  businesses: [],
  userBusiness: [],
  currentBusiness: {},
  searchResults: {},
  pageDetails: {}
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

    case AVERAGE_RATING:
      return {
        ...state,
        averageRating: action.ratings
      };

    case USER_BUSINESSES:
      return {
        ...state,
        userBusiness: action.businesses
      };

    case FOUND_BUSINESSES:
      return {
        ...state,
        searchResults: action.searchResponse
      };

    case CURRENT_BUSINESS:
      return {
        ...state,
        currentBusiness: action.business
      };

    case SET_PAGINATION:
      return {
        ...state,
        pageDetails: action.pageDetails
      };

    default:
      return state;
  }
}
