import {
  ADD_BUSINESS,
  GET_BUSINESSES,
  AVERAGE_RATING,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS,
  BUSINESS_IMAGE_UPLOAD,
  BUSINESS_IMAGE_ERROR_UPLOAD,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  CREATE_BUSINESS_FAILED,
  DELETE_SUCCESS
} from '../actions/types';

/**
 * @description - Business reduce
 * @param {*} state
 * @param {*} actio
 * @returns { business } - State
 */

const initialState = {
  averageRating: 0,
  businesses: {},
  userBusiness: [],
  currentBusiness: {},
  createBusinessErrors: [],
  searchResults: {},
  imageUrl: '',
  imageUploadError: '',
  uploadSuccess: '',
  updateErrors: [],
  updateSuccess: '',
  deleteSuccess: ''
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

    case CREATE_BUSINESS_FAILED:
      return {
        ...state,
        createBusinessErrors: action.errors
      };

    case GET_BUSINESSES:
      return {
        ...state,
        businesses: action.businessesData
      };

    case BUSINESS_IMAGE_UPLOAD:
      return {
        ...state,
        imageUrl: action.url
      };

    case BUSINESS_IMAGE_ERROR_UPLOAD:
      return {
        ...state,
        imageUploadError: action.error
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        updateSuccess: action.success
      };

    case UPDATE_ERROR:
      return {
        ...state,
        updateErrors: action.errors
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

    case DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.message
      };

    default:
      return state;
  }
}
