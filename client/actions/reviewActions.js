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
 * @param { Array } reviews
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
 * @param { Number } ratings
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
 * @param { Number } id
 * @returns { reviews } - Action
 */
export const fetchReviews = id => (dispatch) => {
  dispatch(isLoading(true));
  return axios.get(`/api/v1/businesses/${id}/reviews`)
    .then((res) => {
      dispatch(averageRating(res.data.averageRating));
      dispatch(getReview(res.data.reviews));
      dispatch(isLoading(false));
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

/**
 * @description - Adds review to store
 * @param { Object } review
 * @returns { review } - Action
 */
export function postReviewSuccess(review) {
  return {
    type: POST_REVIEW,
    review
  };
}

/**
 * @description - Posts a new review
 * @param { Number } id
 * @param { Object } review
 * @param { Object } user
 * @returns { review } - Action
 */
export const addReview = (id, review, user) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.post(`/api/v1/businesses/${id}/reviews`, review)
    .then((res) => {
      dispatch(postReviewSuccess({ ...res.data.createdReview, reviewer: { ...user } }));
      toastr.success('Review posted!');
      dispatch(isLoading(false));
    })
    .catch((err) => {
      dispatch(isLoading(false));
      toastr.err(err.response.data.message);
    });
};

/**
 * @description - Adds review to store
 * @param { Object } review
 * @returns { review } - Action
 */
export function editReviewSuccess(review) {
  return {
    type: EDIT_REVIEW,
    review
  };
}

/**
 * @description - Posts a new review
 * @param { Number } businessId
 * @param { Number } reviewId
 * @param { Object } review
 * @param { Object } user
 * @returns { review } - Action
 */
export const editReview = (businessId, reviewId, review, user) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.put(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then((res) => {
      toastr.success('Review successfully updated');
      dispatch(editReviewSuccess({ ...res.data.updatedReview, reviewer: { ...user } }));
      dispatch(isLoading(false));
    })
    .catch(() => {
      toastr.err('Update review failed!');
      dispatch(isLoading(false));
    });
};

/**
 * @description - Deletes review from store
 * @param { Number } reviewId
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
 * @param { Number } businessId
 * @param { Number } reviewId
 * @returns { deletedReviewId } - Action
 */
export const deleteReview = (businessId, reviewId) => (dispatch) => {
  dispatch(isLoading(true));
  return axios.delete(`/api/v1/businesses/${businessId}/reviews/${reviewId}`)
    .then(() => {
      toastr.success('Review successfully deleted!');
      dispatch(reviewDeleted(reviewId));
      dispatch(isLoading(false));
    })
    .catch((err) => {
      toastr.err(err.response.data.message);
      dispatch(isLoading(false));
    });
};
