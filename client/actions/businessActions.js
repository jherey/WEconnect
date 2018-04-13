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

export function setBusinesses(businesses) {
	return {
		type: 'SET_BUSINESSES',
		businesses
	}
}

export function getAllBusinesses() {
	return dispatch => {
		return axios.get('api/v1/businesses')
			.then(businesses => {
			dispatch(setBusinesses(businesses.data.allBusinesses));
		});
	}
}