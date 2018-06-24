import axios from 'axios';
import isLoading from './loading';

/**
 * @description - Set progress value
 * @export { Function } - Set Upload Progress
 * @param { number } progress - Upload status
 * @returns { Number } - Action
 */
export function setProgress(progress) {
  return {
    type: 'SET_PROGRESS',
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
    type: 'ADD_BUSINESS',
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
    type: 'ONE_BUSINESS',
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

// /**
//  * @description - Updates a business
//  * @param {*} updatedBusiness
//  * @returns { updatedBusiness } - Action
//  */
// export function businessUpdated(updatedBusiness) {
//   return {
//     type: 'UPDATE_BUSINESS',
//     updatedBusiness
//   };
// }

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

// /**
//  * @description - Action to update a business
//  * @param {*} businessId
//  * @returns { BusinessId } - Action
//  */
// export function businessDeleted(businessId) {
//   return {
//     type: 'DELETE_BUSINESS',
//     businessId
//   };
// }

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
    type: 'SET_BUSINESSES',
    businesses
  };
}

/**
 * @description - Gets all businesses
 * @param {*} pageNum
 * @returns { Businesses } - Action
 */
export const getAllBusinesses = pageNum => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses?pageNum=${pageNum}`)
    .then((businesses) => {
      dispatch(allBusinesses(businesses.data.allBusinesses));
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
    type: 'USER_BUSINESSES',
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
    .then((businesses) => {
      dispatch(isLoading(false));
      dispatch(userBusinesses(businesses.data.businesses));
    });
};

/**
 * @description - Updates store with search results
 * @param {*} businesses
 * @returns { Businesses } - Action
 */
export function businessFound(businesses) {
  return {
    type: 'FOUND_BUSINESSES',
    businesses
  };
}

/**
 * @description - Search results
 * @param {*} searchWord
 * @param {*} type
 * @returns { BusinessesFound } - Action
 */
export const search = (searchWord, type) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses?${type}=${searchWord}`)
    .then((foundBusiness) => {
      dispatch(isLoading(false));
      dispatch(businessFound(foundBusiness.data));
    });
};
