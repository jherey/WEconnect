import axios from 'axios';
import { isLoading } from './userActions';
import {
  AVERAGE_RATING,
  GET_REVIEWS,
  POST_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from './types';

/**
 * @description - Updates reviews store
 * @param {*} reviews
 * @returns { reviews } - Action
 */
export function getReview(reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  };
}

/**
 * @description - Updates store with all businesses
 * @param {*} ratings
 * @returns { Businesses } - Action
 */
export function averageRating(ratings) {
  return {
    type: AVERAGE_RATING,
    ratings
  };
}

/**
 * @description - Gets all reviews for a business
 * @param {*} id
 * @returns { reviews } - Action
 */
export const fetchReviews = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses/${id}/reviews`)
    .then((review) => {
      dispatch(averageRating(review.data.averageRating));
      dispatch(getReview(review.data.reviews));
      dispatch(isLoading(false));
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
    type: POST_REVIEW,
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
  return axios.post(`/api/v1/businesses/${id}/reviews`, review)
    .then((res) => {
      dispatch(postReview(res.data.createdReview));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Adds review to store
 * @param {*} review
 * @returns { review } - Action
 */
export function edirReviewResponse(review) {
  return {
    type: EDIT_REVIEW,
    review
  };
}

/**
 * @description - Posts a new review
 * @param {*} businessId
 * @param {*} reviewId
 * @param {*} review
 * @returns { review } - Action
 */
export const editReview = (businessId, reviewId, review) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.put(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then(() => {
      // dispatch(edirReviewResponse(res.data.createdReview));
      dispatch(isLoading(false));
    });
};

/**
 * @description - Deletes review from store
 * @param {reviewId} reviewId
 * @returns { reviewId } - Action
 */
export function reviewDeleted(reviewId) {
  return {
    type: DELETE_REVIEW,
    reviewId
  };
}

/**
 * @description - Deletes a new review
 * @param {*} businessId
 * @param {*} reviewId
 * @returns { deletedReviewId } - Action
 */
export const deleteReview = (businessId, reviewId) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.delete(`/api/v1/businesses/${businessId}/reviews/${reviewId}`)
    .then(() => {
      dispatch(reviewDeleted(reviewId));
      dispatch(isLoading(false));
    });
};
