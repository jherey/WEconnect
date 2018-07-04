import { GET_REVIEWS, POST_REVIEW, DELETE_REVIEW } from '../actions/types';

const initialState = {
  reviews: [],
  review: {},
};

/**
 * @description - Review reducer
 *
 * @param {*} state
 * @param {*} action
 *
 * @returns { review } - State
 */
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };

    case POST_REVIEW:
      return {
        ...state,
        review: [...state.reviews, action.review]
      };
    
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.reviewId)
      };

    default:
      return state;
  }
}
