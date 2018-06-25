import { GET_REVIEWS, POST_REVIEW } from '../actions/types';

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

    default:
      return state;
  }
}
