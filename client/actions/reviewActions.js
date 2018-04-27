import axios from 'axios';
import { isLoading } from './loading';

export function getReview(reviews) {
	return {
		type: 'GET_REVIEWS',
		reviews
	}
}

export function fetchReviews(id) {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.get(`http://localhost:8000/api/v1/businesses/${id}/reviews`)
			.then(review => {
				dispatch(isLoading(false));
				dispatch(getReview(review.data.reviews));
			})
			.catch(error => {
				dispatch(isLoading(false));
			});
	}
}

export function postReview(review) {
	return {
		type: 'POST_REVIEW',
		review
	}
}

export function addReview(id, review) {
	return dispatch => {
		dispatch(isLoading(true));
		return axios.post(`http://localhost:8000/api/v1/businesses/${id}/reviews`, review)
			.then(review => {
				dispatch(isLoading(false));
				dispatch(postReview(review.data.createdReview));
			})
			.catch(error => {
				dispatch(isLoading(false));
			});
	}
}