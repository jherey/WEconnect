import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {
  SET_API_STATUS,
  GET_REVIEWS,
  AVERAGE_RATING,
  POST_REVIEW,
  DELETE_REVIEW,
  EDIT_REVIEW
} from '../../actions/types';
import {
  fetchReviews,
  addReview,
  editReview,
  deleteReview
} from '../../actions/reviewActions';
import {
  user,
  reviews,
  newReview,
  review,
  updatedReview
} from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const id = 1;

describe('Review Actions', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      err: () => {}
    };
    moxios.install();
  });
  afterEach(() => moxios.uninstall());

  describe('Get Reviews Action', () => {
    it('should dispatch an action to get all the reviews and average rating of the business', (done) => {
      moxios.stubRequest(`/api/v1/businesses/${id}/reviews`, {
        status: 200,
        response: reviews
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: AVERAGE_RATING, ratings: reviews.averageRating },
        { type: GET_REVIEWS, reviews: reviews.reviews },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchReviews(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should not dispatch an action to get all the reviews and average rating', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchReviews(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Post Review Action', () => {
    it('should dispatch an action to post a review', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: review
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: POST_REVIEW, review: { ...review.createdReview, reviewer: { ...user } } },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(addReview(id, newReview, user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should dispatch an action to show error on posting a review', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            message: 'Review failed to post'
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(addReview(id, newReview, user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Edit Review Action', () => {
    it('should dispatch an action to edit the review', (done) => {
      moxios.stubRequest(`/api/v1/businesses/${id}/reviews/${id}`, {
        status: 200,
        response: {
          response: {
            updatedReview
          }
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: EDIT_REVIEW, review: { ...review.updatedReview, reviewer: { ...user } } },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(editReview(id, id, updatedReview, user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should dispatch an action to edit the review', (done) => {
      moxios.stubRequest(`/api/v1/businesses/${id}/reviews/${id}`, {
        status: 400
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(editReview(id, id, updatedReview, user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Delete Review Action', () => {
    it('should dispatch an action to delete the review', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Review successfully deleted!'
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: DELETE_REVIEW, reviewId: id },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(deleteReview(id, id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  it('should dispatch an action to delete the review', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'Review not deleted!'
        }
      });
    });
    const expectedAction = [
      { type: SET_API_STATUS, status: true },
      { type: SET_API_STATUS, status: false }
    ];
    const store = mockStore({});
    return store.dispatch(deleteReview(id, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
  });
});
