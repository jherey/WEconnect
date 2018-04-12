import axios from 'axios';

/**
 * @returns {Object} promiseost
 * @param {*} businessData
 */
export function createBusiness(businessData) {
	return dispatch => {
		return axios.post('api/v1/businesses', businessData);
	};
}