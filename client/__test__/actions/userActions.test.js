import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {
  SET_API_STATUS,
  SET_CURRENT_USER,
  EDIT_USER,
  UPDATE_USER_FAILED,
  IMAGE_UPLOAD,
  IMAGE_ERROR_UPLOAD,
  AUTH_ERROR
} from '../../actions/types';
import {
  isLoading,
  signupUser,
  signinUser,
  updateUser,
  signout,
  imageUpload
} from '../../actions/userActions';
import {
  userData,
  token,
  authError,
  uploadImage,
  imageUploadError,
  imageUploadResponse
} from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userId = 1;

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

describe('User actions', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    moxios.install();
  });
  afterEach(() => moxios.uninstall());

  it('action to set API status on request', (done) => {
    const status = true;
    const expectedAction = {
      type: SET_API_STATUS,
      status
    };
    expect(isLoading(status)).toEqual(expectedAction);
    done();
  });

  describe('When I call the signup action', () => {
    it('Then it should dispatch an action to set the current user', (done) => {
      moxios.stubRequest('/api/v1/auth/signup', {
        status: 201,
        response: {
          message: 'Signed up successfully',
          token
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_CURRENT_USER, user: { ...userData, iat: Math.floor(Date.now() / 1000) } },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(signupUser(userData, props))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('Then it should not dispatch an action to set the current user on error', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: ['Username is required']
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: AUTH_ERROR, errors: authError.error },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(signupUser(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('When I call the signin action', () => {
    it('Then it should dispatch an action to set the current user', (done) => {
      moxios.stubRequest('/api/v1/auth/login', {
        status: 200,
        response: {
          message: 'User logged in successfully',
          token
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: SET_CURRENT_USER, user: { ...userData, iat: Math.floor(Date.now() / 1000) } },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(signinUser(userData, props))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('Then it should dispatch a signin error action', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: ['Username/Password Incorrect']
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: AUTH_ERROR, errors: authError.signinError },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(signinUser(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('When I call the update user action', () => {
    it('Then it should dispatch an action to update the details of the user', (done) => {
      moxios.stubRequest(`/api/v1/auth/${userId}`, {
        status: 200,
        response: {
          message: 'User Details Updated Successfully',
          updatedUser: userData
        }
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: EDIT_USER, user: userData },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(updateUser(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('Then it should dispatch an update failed action', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: ['Username is required']
          }
        });
      });
      const expectedAction = [
        { type: SET_API_STATUS, status: true },
        { type: UPDATE_USER_FAILED, errors: authError.error },
        { type: SET_API_STATUS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(updateUser(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('When I call the signout user action', () => {
    it('Then it should dispatch an action to delete the details of the user', (done) => {
      const expectedAction = [{ type: SET_CURRENT_USER, user: {} }];
      const store = mockStore({});
      store.dispatch(signout());
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  describe('When I upload an image', () => {
    it('should dispatch an IMAGE_UPLOAD type on sucess', (done) => {
      // const cloudinaryApi = 'https://api.cloudinary.com/v1_1/diiceprhy/image/upload';
      moxios.stubRequest('https://api.cloudinary.com/v1_1/diiceprhy/image/upload', {
        status: 200,
        response: imageUploadResponse
      });
      const expectedAction = [
        { type: IMAGE_UPLOAD, url: imageUploadResponse.secure_url },
      ];
      const store = mockStore({});
      return store.dispatch(imageUpload(uploadImage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });

    it('creates IMAGE_UPLOAD when upload is done', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          error: 'Image upload failed, try again!'
        });
      });
      const expectedAction = [{ type: IMAGE_ERROR_UPLOAD, error: imageUploadError }];
      const store = mockStore({});
      return store.dispatch(imageUpload(uploadImage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
    });
  });
});
