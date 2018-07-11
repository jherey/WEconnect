import expect from 'expect';
import userReducer from '../../reducers/userReducer';
import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  IMAGE_UPLOAD,
  IMAGE_ERROR_UPLOAD,
  EDIT_USER,
  UPDATE_USER_FAILED,
  SET_API_STATUS
} from '../../actions/types';

describe('User Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      isAuthenticated: false,
      user: {}
    };
    const user = {
      id: 1,
      username: 'jeremiah',
      email: 'jeremiah@gmail.com'
    };
    const action = {
      type: SET_CURRENT_USER,
      user
    };
    const newState = userReducer(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user.username).toEqual('jeremiah');
    expect(newState.user.email).toEqual('jeremiah@gmail.com');
  });

  it('should return errors for invalid action type', () => {
    const initialState = {
      isAuthenticated: false,
      user: {}
    };
    const errors = ['Email is required'];
    const action = {
      type: AUTH_ERROR,
      errors
    };
    const newState = userReducer(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual({});
    expect(newState.errors).toEqual(['Email is required']);
  });

  it('should save profile image when passed with IMAGE_UPLOAD', () => {
    const initialState = {
      imageUrl: ''
    };
    const url = 'https://jeremiah.com';

    const action = {
      type: IMAGE_UPLOAD,
      url
    };
    const newState = userReducer(initialState, action);
    expect(newState.imageUrl).toEqual('https://jeremiah.com');
  });

  it('should show upload error when passed with IMAGE_ERROR_UPLOAD', () => {
    const initialState = {
      imageUploadError: ''
    };
    const error = 'Upload failed!';

    const action = {
      type: IMAGE_ERROR_UPLOAD,
      error
    };
    const newState = userReducer(initialState, action);
    expect(newState.imageUploadError).toEqual('Upload failed!');
  });

  it('should edit user details when passed with EDIT_USER', () => {
    const initialState = {
      user: {}
    };
    const userDetails = {
      username: 'jherey'
    };
    const action = {
      type: EDIT_USER,
      user: userDetails
    };
    const newState = userReducer(initialState, action);
    expect(newState.user.username).toEqual('jherey');
  });

  it('should not edit user details when passed with UPDATE_USER_FAILED', () => {
    const initialState = {
      updateUserError: []
    };
    const errors = ['Password is required'];
    const action = {
      type: UPDATE_USER_FAILED,
      errors
    };
    const newState = userReducer(initialState, action);
    expect(newState.updateUserError).toEqual(['Password is required']);
  });

  it('should set API status when passed with SET_API_STATUS', () => {
    const initialState = {
      isLoading: false
    };
    const status = true;
    const action = {
      type: SET_API_STATUS,
      status
    };
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('should return the initial state', () => {
    const initialState = {
      isAuthenticated: false,
      user: {},
      updateUserError: [],
      isLoading: false,
      imageUrl: '',
      imageUploadError: '',
      errors: []
    };
    const action = {};
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
