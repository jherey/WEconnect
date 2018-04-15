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

export function getOneBusiness(business) {
	return {
		type: 'ONE_BUSINESS',
		business
	}
}

export function fetchBusiness(id) {
	return dispatch => {
		return axios.get(`http://localhost:8000/api/v1/businesses/${id}`)
			.then(business => {
				dispatch(getOneBusiness(business.data.business));
			})
	}
}

export function businessUpdated(updatedBusiness) {
	return {
		type: 'UPDATE_BUSINESS',
		updatedBusiness
	}
}

export function updateBusiness(updatedBusinessData) {
	return dispatch => {
		return axios.put(`http://localhost:8000/api/v1/businesses/${updatedBusinessData.id}`, updatedBusinessData)
			.then(updatedBusinessData => {
				dispatch(businessUpdated(updatedBusinessData.data.updatedBusiness))
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