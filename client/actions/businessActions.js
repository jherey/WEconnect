import axios from 'axios';
import { isLoading } from './userActions';
import {
  SET_PROGRESS,
  ADD_BUSINESS,
  GET_BUSINESSES,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS,
  SET_PAGINATION
} from './types';

/**
 * @description - Set progress value
 * @export { Function } - Set Upload Progress
 * @param { number } progress - Upload status
 * @returns { Number } - Action
 */
export function setProgress(progress) {
  return {
    type: SET_PROGRESS,
    progress
  };
}

/**
 * @description - Add new business
 * @export { Function } - Add business to store
 * @param {*} business
 * @returns { Business } - Action
 */
export function addBusiness(business) {
  return {
    type: ADD_BUSINESS,
    business
  };
}

/**
 * @export { Function } - Create new business
 * @param {*} businessData
 * @returns {Object} business
 */
export const createBusiness = businessData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('/api/v1/businesses', businessData)
    .then((res) => {
      dispatch(addBusiness(res.data.business));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Gets one business
 * @export { Function } - Get business from store
 * @param {*} business
 * @returns { Business } - Action
 */
export function getOneBusiness(business) {
  return {
    type: CURRENT_BUSINESS,
    business
  };
}

/**
 * @description - Add new business
 * @export { Function } - Add business to store
 * @param {*} id
 * @returns { Business } - Action
 */
export const fetchBusiness = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses/${id}`)
    .then((business) => {
      dispatch(getOneBusiness(business.data.business));
      dispatch(isLoading(false));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Updates a business
 * @param {*} updatedBusinessData
 * @returns { Business } - Action
 */
export const updateBusiness = updatedBusinessData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.put(`/api/v1/businesses/${updatedBusinessData.id}`, updatedBusinessData)
    .then(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Deletes a business
 * @param {*} id
 * @returns { BusinessId } - Action
 */
export const deleteBusiness = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.delete(`/api/v1/businesses/${id}`)
    .then(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Updates store with all businesses
 * @param {*} businesses
 * @returns { Businesses } - Action
 */
export function allBusinesses(businesses) {
  return {
    type: GET_BUSINESSES,
    businesses
  };
}

/**
 *  @description - Updates store with page details
 * @param {*} pageDetails
 * @returns { Object } - Action
 */
export function paginationDetails(pageDetails) {
  return {
    type: SET_PAGINATION,
    pageDetails
  };
}

/**
 * @description - Gets businesses by page
 * @param {*} pageNumber
 * @returns { Businesses } - Action
 */
export const getBusinessesByPage = pageNumber => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses?pageNum=${pageNumber}`)
    .then((businesses) => {
      dispatch(allBusinesses(businesses.data.allBusinesses.rows));
      dispatch(paginationDetails(businesses.data.pageDetails));
      dispatch(isLoading(false));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Updates store with all businesses
 * @param {*} businesses
 * @returns { Businesses } - Action
 */
export function userBusinesses(businesses) {
  return {
    type: USER_BUSINESSES,
    businesses
  };
}

/**
 * @description - Gets all user's businesses
 * @param {*} userId
 * @returns { userBusinesses } - Action
 */
export const getAUserBusiness = userId => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/${userId}/businesses`)
    .then((response) => {
      dispatch(userBusinesses(response.data.businesses));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Updates store with search results
 * @param {*} searchResponse
 * @returns { Businesses } - Action
 */
export function businessFound(searchResponse) {
  return {
    type: FOUND_BUSINESSES,
    searchResponse
  };
}

/**
 * @description - Search results
 * @param {*} searchWord
 * @param {*} type
 * @param {*} pageNum
 * @returns { BusinessesFound } - Action
 */
export const search = (searchWord, type, pageNum) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses?${type}=${searchWord}&pageNum=${pageNum}`)
    .then((response) => {
      dispatch(businessFound(response.data));
      dispatch(isLoading(false));
    })
    .catch((error) => {
      dispatch(businessFound(error.response.data));
      dispatch(isLoading(false));
    });
};
