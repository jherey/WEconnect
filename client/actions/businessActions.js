import axios from 'axios';
import { isLoading } from './userActions';
import {
  SET_PROGRESS,
  ADD_BUSINESS,
  GET_BUSINESSES,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS,
  SET_PAGINATION,
  BUSINESS_IMAGE_UPLOAD,
  BUSINESS_IMAGE_ERROR_UPLOAD,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  CREATE_BUSINESS_FAILED,
  DELETE_SUCCESS
} from './types';

require('dotenv').config();

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
 * @description - Sets one user in store
 * @param {*} url
 * @returns {Object} user
 */
export function businessImageUpload(url) {
  return {
    type: BUSINESS_IMAGE_UPLOAD,
    url
  };
}

/**
 * @description - Sets one user in store
 * @param {*} error
 * @returns {Object} user
 */
export function businessImageUploadError(error) {
  return {
    type: BUSINESS_IMAGE_ERROR_UPLOAD,
    error
  };
}

/**
 * @description - Sets one user in store
 * @param {*} image
 * @returns {Object} user
 */
export const imageUpload = image => (dispatch) => {
  const uploadPreset = process.env.UPLOAD_PRESET;
  const cloudinaryApi = process.env.CLOUDINARY_API;
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', uploadPreset);
  delete axios.defaults.headers.common.Authorization;
  return axios.post(cloudinaryApi, data)
    .then((response) => {
      const { token } = localStorage;
      axios.defaults.headers.common.Authorization = token;
      const cloudImageUrl = response.data.secure_url;
      dispatch(businessImageUpload(cloudImageUrl));
    })
    .catch(() => {
      dispatch(businessImageUploadError('Image upload failed, try again!'));
    });
};

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
 * @description - Add new business
 * @export { Function } - Add business to store
 * @param {*} errors
 * @returns { Business } - Action
 */
export function createBusinessError(errors) {
  return {
    type: CREATE_BUSINESS_FAILED,
    errors
  };
}

/**
 * @export { Function } - Create new business
 * @param {*} businessData
 * @param {*} props
 * @returns {Object} business
 */
export const createBusiness = (businessData, props) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post('/api/v1/businesses', businessData)
    .then((res) => {
      const { business } = res.data;
      dispatch(addBusiness(business));
      toastr.success('Business registered successfully');
      props.history.push(`/${business.id}`);
      dispatch(isLoading(false));
    })
    .catch((err) => {
      const { errors } = err.response.data;
      dispatch(createBusinessError(errors));
      errors.map(error => toastr.error(error));
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
    .then((res) => {
      dispatch(getOneBusiness(res.data.business));
      dispatch(isLoading(false));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Gets one business
 * @export { Function } - Get business from store
 * @param {*} success
 * @returns { Business } - Action
 */
export function updateBusinessSuccess(success) {
  return {
    type: UPDATE_SUCCESS,
    success
  };
}

/**
 * @description - Gets one business
 * @export { Function } - Get business from store
 * @param {*} errors
 * @returns { Business } - Action
 */
export function updateBusinessError(errors) {
  return {
    type: UPDATE_ERROR,
    errors
  };
}

/**
 * @description - Updates a business
 * @param {*} updatedBusinessData
 * @returns { Business } - Action
 */
export const updateBusiness = updatedBusinessData => (dispatch) => {
  dispatch(isLoading(true));
  return axios.put(`/api/v1/businesses/${updatedBusinessData.id}`, updatedBusinessData)
    .then((res) => {
      dispatch(updateBusinessSuccess(res.data.message));
      toastr.success('Business updated successfully!');
      dispatch(isLoading(false));
    })
    .catch((err) => {
      const { errors } = err.response.data;
      dispatch(updateBusinessError(errors));
      errors.map(error => toastr.error(error));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Gets one business
 * @export { Function } - Get business from store
 * @param {*} message
 * @returns { Business } - Action
 */
export function deleteBusinessSuccess(message) {
  return {
    type: DELETE_SUCCESS,
    message
  };
}

/**
 * @description - Deletes a business
 * @param {*} id
 * @returns { BusinessId } - Action
 */
export const deleteBusiness = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.delete(`/api/v1/businesses/${id}`)
    .then((res) => {
      dispatch(deleteBusinessSuccess(res.data.message));
      dispatch(isLoading(false));
    })
    .catch(() => {
      toastr.error('Business delete failed!');
      dispatch(isLoading(false));
    });
};

/**
 * @description - Updates store with all businesses
 * @param {*} businessesData
 * @returns { Businesses } - Action
 */
export function allBusinesses(businessesData) {
  return {
    type: GET_BUSINESSES,
    businessesData
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
    .then((res) => {
      dispatch(allBusinesses(res.data));
      // dispatch(paginationDetails(res.data.pageDetails));
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
 * @param {*} history
 * @returns { BusinessesFound } - Action
 */
export const search = (searchWord, type, pageNum, history) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses?${type}=${searchWord}&pageNum=${pageNum}`)
    .then((response) => {
      dispatch(businessFound(response.data));
      history.push('/search');
      dispatch(isLoading(false));
    })
    .catch((error) => {
      dispatch(businessFound(error.response.data));
      history.push('/search');
      dispatch(isLoading(false));
    });
};
