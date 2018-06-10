import axios from 'axios';
import isLoading from './loading';

/**
 * @description - Updates reviews store
 * @param {*} reviews
 * @returns { reviews } - Action
 */
export function getReview(reviews) {
  return {
    type: 'GET_REVIEWS',
    reviews
  };
}

/**
 * @description - Gets all reviews for a business
 * @param {*} id
 * @returns { reviews } - Action
 */
export const fetchReviews = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`http://localhost:8000/api/v1/businesses/${id}/reviews`)
    .then((review) => {
      dispatch(isLoading(false));
      dispatch(getReview(review.data.reviews));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Adds review to store
 * @param {*} review
 * @returns { review } - Action
 */
export function postReview(review) {
  return {
    type: 'POST_REVIEW',
    review
  };
}

/**
 * @description - Posts a new review
 * @param {*} id
 * @param {*} review
 * @returns { review } - Action
 */
export const addReview = (id, review) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post(`http://localhost:8000/api/v1/businesses/${id}/reviews`, review)
    .then((res) => {
      dispatch(isLoading(false));
      dispatch(postReview(res.data.createdReview));
    });
};
