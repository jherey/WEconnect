import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {
  ADD_BUSINESS,
  CURRENT_BUSINESS,
  SET_API_STATUS,
  GET_BUSINESSES,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  SET_PROGRESS,
  BUSINESS_IMAGE_UPLOAD,
  BUSINESS_IMAGE_ERROR_UPLOAD,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_SUCCESS,
  CREATE_BUSINESS_FAILED
} from '../../actions/types';
import {
  createBusiness,
  fetchBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessesByPage,
  getAUserBusiness,
  search,
  setProgress,
  imageUpload
} from '../../actions/businessActions';
import {
  businessData,
  updatedBusiness,
  allBusinesses,
  userBusinesses,
  imageUploadResponse,
  uploadImage,
  imageUploadError,
  businessUpdate,
  businessDelete,
  createBusinessError
} from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const businessId = 1;
const pageNumber = 1;
const userId = 1;

describe('Business Actions', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    moxios.install();
  });
  afterEach(() => moxios.uninstall());

  it('should dispatch an action to set the upload progress of an image', () => {
    const progress = '57';
    const expectedAction = {
      type: SET_PROGRESS,
      progress
    };
    expect(setProgress(progress)).toEqual(expectedAction);
  });

  describe('Upload Image Action', () => {
    it('should diaptch IMAGE_UPLOAD action type when upload is successful', async (done) => {
      moxios.stubRequest('https://api.cloudinary.com/v1_1/diiceprhy/image/upload', {
        status: 200,
        response: imageUploadResponse
      });
      const expectedAction = [
        { type: BUSINESS_IMAGE_UPLOAD, url: imageUploadResponse.secure_url },
      ];
      const store = mockStore({});
      await store.dispatch(imageUpload(uploadImage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should display error when upload fails', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          error: 'Image upload failed, try again!'
        });
      });
      const expectedAction = [{ type: BUSINESS_IMAGE_ERROR_UPLOAD, error: imageUploadError }];
      const store = mockStore({});
      await store.dispatch(imageUpload(uploadImage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Add Business Action', () => {
    it('should dispatch an action to add a business', (done) => {
      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: {
          message: 'Business created successfully',
          business: businessData
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: ADD_BUSINESS, business: businessData },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(createBusiness(businessData, props)) // eslint-disable-line no-undef
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should dispatch CREATE_BUSINESS_FAILED when creating a business fails', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: ['Business name is required']
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: CREATE_BUSINESS_FAILED, errors: createBusinessError },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(createBusiness(businessData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Get Business Action', () => {
    it('should dispatch CURRENT_BUSINESS action type', (done) => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
        status: 200,
        response: {
          message: 'Business Found',
          business: businessData
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: CURRENT_BUSINESS, business: businessData },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchBusiness(businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should not dispatch an action to get a business', (done) => {
      moxios.stubRequest('/api/v1/businesses/8', {
        status: 404,
        response: {
          message: 'Business Not Found!'
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchBusiness(8))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Update Business Action', () => {
    it('should update a business on success', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Business Update Successful'
          }
        });
      });

      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: UPDATE_SUCCESS, success: businessUpdate.successMessage },
        { type: SET_API_STATUS, status: false }
      ];

      const store = mockStore({});

      return store.dispatch(updateBusiness(updatedBusiness))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should not update a business on error', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: ['Email is required']
          }
        });
      });

      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: UPDATE_ERROR, errors: businessUpdate.errorMessage },
        { type: SET_API_STATUS, status: false }
      ];

      const store = mockStore({});

      return store.dispatch(updateBusiness(updatedBusiness))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Delete Business Action', () => {
    it('should delete a business on success', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Business Successfully Deleted!'
          }
        });
      });

      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: DELETE_SUCCESS, message: businessDelete.deleteSuccess },
        { type: SET_API_STATUS, status: false }
      ];

      const store = mockStore({});

      return store.dispatch(deleteBusiness(businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should not delete a business on error', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400
        });
      });

      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];

      const store = mockStore({});

      return store.dispatch(deleteBusiness(businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Get all Businesses Action', () => {
    it('should dispatch an action to get all businesses by page', (done) => {
      moxios.stubRequest(`/api/v1/businesses?pageNum=${pageNumber}`, {
        status: 200,
        response: allBusinesses
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: GET_BUSINESSES, businessesData: allBusinesses },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(getBusinessesByPage(pageNumber))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should not dispatch an action to get all businesses by page', (done) => {
      moxios.stubRequest(`/api/v1/businesses?pageNum=${pageNumber}`, {
        status: 404
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(getBusinessesByPage(pageNumber))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('Search Business Action', () => {
    it('should dispatch an action to search all businesses', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: allBusinesses
        });
      });
      const searchWord = 'and';
      const type = 'name';
      const history = [];
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: FOUND_BUSINESSES, searchResponse: allBusinesses },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(search(searchWord, type, userId, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('should dispatch FOUND_BUSINESSES action type if no business found', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: allBusinesses
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: FOUND_BUSINESSES, searchResponse: allBusinesses },
        { type: SET_API_STATUS, status: false }
      ];
      const searchWord = 'and';
      const type = 'name';
      const history = [];
      const store = mockStore({});
      return store.dispatch(search(searchWord, type, pageNumber, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('User Business Action', () => {
    it('should dispatch an action to get a user\'s business', (done) => {
      moxios.stubRequest(`/api/v1/${userId}/businesses`, {
        status: 200,
        response: userBusinesses
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: USER_BUSINESSES, businesses: userBusinesses.businesses },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(getAUserBusiness(userId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });
});
