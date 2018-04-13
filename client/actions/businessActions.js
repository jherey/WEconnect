import axios from 'axios';

export function addBusiness(business) {
	return {
		type: 'ADD_BUSINESS',
		business
	}
}

/**
 * @returns {Object} promiseost
 * @param {*} businessData
 */
export function createBusiness(businessData) {
	return dispatch => {
		return axios.post('api/v1/businesses', businessData)
			.then(businessData => {
				dispatch(addBusiness(businessData.data.business))
			});
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