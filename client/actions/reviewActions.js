import axios from 'axios';

export function getReview(reviews) {
	return {
		type: 'GET_REVIEWS',
		reviews
	}
}

export function fetchReviews(id) {
	return dispatch => {
		return axios.get(`http://localhost:8000/api/v1/businesses/${id}/reviews`)
			.then(review => {
				dispatch(getReview(review.data.reviews));
			})
	}
}