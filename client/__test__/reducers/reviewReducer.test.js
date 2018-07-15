import expect from 'expect';
import reviewReducer from '../../reducers/reviewReducer';
import {
  GET_REVIEWS,
  POST_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from '../../actions/types';

describe('Review reducer', () => {
  it('gets all reviews for a business when passed with GET_REVIEWS', () => {
    const initialState = {
      reviews: []
    };
    const reviews = [
      {
        id: 27,
        review: 'good firm',
        userId: 1,
        username: 'jerry',
        star: 5,
        businessId: 1,
        createdAt: '2018-07-06T21:10:06.520Z',
        updatedAt: '2018-07-06T21:10:06.520Z'
      }
    ];
    const action = {
      type: GET_REVIEWS,
      reviews
    };
    const newState = reviewReducer(initialState, action);
    expect(newState.reviews[0].id).toEqual(27);
    expect(newState.reviews[0].review).toEqual('good firm');
    expect(newState.reviews[0].star).toEqual(5);
  });

  it('posts a new review when passed with POST_REVIEW', () => {
    const initialState = {
      reviews: [],
      review: {}
    };
    const review = {
      review: 'good firm again',
      star: 4
    };
    const action = {
      type: POST_REVIEW,
      review
    };
    const newState = reviewReducer(initialState, action);
    expect(newState.reviews[0].review).toEqual('good firm again');
    expect(newState.reviews[0].star).toEqual(4);
  });

  it('edits a review when passed with EDIT_REVIEW', () => {
    const initialState = {
      reviews: [
        {
          id: 1,
          review: 'good firm again',
          star: 4
        }
      ],
      review: {}
    };
    const review = {
      id: 1,
      review: 'dont like them',
      star: 1
    };
    const action = {
      type: EDIT_REVIEW,
      review
    };
    const newState = reviewReducer(initialState, action);
    expect(newState.reviews[0].review).toEqual('dont like them');
    expect(newState.reviews[0].star).toEqual(1);
  });

  it('delets a review when passed with DELETE_REVIEW', () => {
    const initialState = {
      reviews: [
        {
          id: 4,
          review: 'good firm again',
          star: 5
        }
      ]
    };
    const reviewId = 4;
    const action = {
      type: DELETE_REVIEW,
      reviewId
    };
    const newState = reviewReducer(initialState, action);
    expect(newState.reviews).toEqual([]);
  });

  it('should return the initial state', () => {
    const initialState = {
      reviews: [],
      review: {}
    };
    const action = {};
    const newState = reviewReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
