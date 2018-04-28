import axios from 'axios';
import { isLoading } from './loading';

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
		dispatch(isLoading(true));
		return axios.post('api/v1/businesses', businessData)
			.then(businessData => {
				dispatch(isLoading(false));
				dispatch(addBusiness(businessData.data.business))
			})
			.catch(error => {
				dispatch(isLoading(false));
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
		dispatch(isLoading(true));
		return axios.get(`http://localhost:8000/api/v1/businesses/${id}`)
			.then(business => {
				dispatch(isLoading(false));
				dispatch(getOneBusiness(business.data.business));
			})
			.catch(error => {
				dispatch(isLoading(false));
			});
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
		dispatch(isLoading(true));
		return axios.put(`http://localhost:8000/api/v1/businesses/${updatedBusinessData.id}`, updatedBusinessData)
			.then(updatedBusinessData => {
				dispatch(isLoading(false));
				dispatch(businessUpdated(updatedBusinessData.data.updatedBusiness))
			})
			.catch(error => {
				dispatch(isLoading(false));
			});
	};
}

export function businessDeleted(businessId) {
	return {
		type: 'DELETE_BUSINESS',
		businessId
	}
}

export function deleteBusiness(id) {
	return dispatch => {
		return axios.delete(`http://localhost:8000/api/v1/businesses/${id}`)
			.then(data => {
				dispatch(businessDeleted(id));
			})
	}
}

export function setBusinesses(businesses) {
	return {
		type: 'SET_BUSINESSES',
		businesses
	}
}

export function getAllBusinesses() {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.get('api/v1/businesses')
			.then(businesses => {
				dispatch(isLoading(false));
				dispatch(setBusinesses(businesses.data.allBusinesses));
			})
			.catch(error => {
				dispatch(isLoading(false));
			});
	}
}

export function businessFound(businesses) {
	return {
		type: 'FOUND_BUSINESSES',
		businesses
	}
}

export function search(searchWord, type) {
	return dispatch => {
		return axios.get(`http://localhost:8000/api/v1/businesses?${type}=${searchWord}`)
			.then(foundBusiness => {
				dispatch(businessFound(foundBusiness.data.business));
			})
			.catch(error => {
				return error;
			})
	}
}