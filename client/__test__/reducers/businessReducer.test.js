import expect from 'expect';
import businessReducer from '../../reducers/businessReducer';
import {
  ADD_BUSINESS,
  CREATE_BUSINESS_FAILED,
  GET_BUSINESSES,
  BUSINESS_IMAGE_UPLOAD,
  BUSINESS_IMAGE_ERROR_UPLOAD,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  AVERAGE_RATING,
  USER_BUSINESSES,
  FOUND_BUSINESSES,
  CURRENT_BUSINESS,
  SET_PAGINATION,
  DELETE_SUCCESS
} from '../../actions/types';

describe('Business reducer', () => {
  it('should create a new business when passed with ADD_BUSINESS', () => {
    const initialState = {
      currentBusiness: {}
    };
    const business = {
      id: 1,
      businessName: 'andela',
      website: 'www.andela.com',
      category: 'technology',
      businessInfo: 'Lorem ipsum dolor sit amet',
      email: 'andela@gmail.com',
      businessImage: 'https://jeremiah.jpg',
      location: 'nigeria'
    };
    const action = {
      type: ADD_BUSINESS,
      business
    };
    const newState = businessReducer(initialState, action);
    expect(newState.currentBusiness.id).toEqual(1);
    expect(newState.currentBusiness.businessName).toEqual('andela');
    expect(newState.currentBusiness.category).toEqual('technology');
    expect(newState.currentBusiness.location).toEqual('nigeria');
  });

  it('should not create a new business when passed with CREATE_BUSINESS_FAILED', () => {
    const initialState = {
      createBusinessErrors: []
    };
    const errors = ['Business name is required'];
    const action = {
      type: CREATE_BUSINESS_FAILED,
      errors
    };
    const newState = businessReducer(initialState, action);
    expect(newState.createBusinessErrors).toEqual(['Business name is required']);
  });

  it('should get business details when passed with GET_BUSINESSES', () => {
    const initialState = {
      businesses: []
    };
    const businesses = [
      {
        id: 1,
        businessName: 'andela',
        website: 'www.andela.com',
        category: 'technology',
        businessInfo: 'Lorem ipsum dolor sit amet',
        email: 'andela@gmail.com',
        businessImage: 'https://jeremiah.jpg',
        location: 'nigeria',
        createdAt: '2018-06-10T17:50:27.544Z',
        updatedAt: '2018-07-07T12:06:30.314Z',
        userId: 1
      }
    ];
    const action = {
      type: GET_BUSINESSES,
      businesses
    };
    const newState = businessReducer(initialState, action);
    expect(newState.businesses[0].id).toEqual(1);
    expect(newState.businesses[0].website).toEqual('www.andela.com');
    expect(newState.businesses[0].email).toEqual('andela@gmail.com');
    expect(newState.businesses[0].location).toEqual('nigeria');
  });

  it('should save profile image when passed with BUSINESS_IMAGE_UPLOAD', () => {
    const initialState = {
      imageUrl: ''
    };
    const url = 'https://andela.com';

    const action = {
      type: BUSINESS_IMAGE_UPLOAD,
      url
    };
    const newState = businessReducer(initialState, action);
    expect(newState.imageUrl).toEqual('https://andela.com');
  });

  it('should show upload error when passed with BUSINESS_IMAGE_ERROR_UPLOAD', () => {
    const initialState = {
      imageUploadError: ''
    };
    const error = 'Upload failed!';

    const action = {
      type: BUSINESS_IMAGE_ERROR_UPLOAD,
      error
    };
    const newState = businessReducer(initialState, action);
    expect(newState.imageUploadError).toEqual('Upload failed!');
  });

  it('should update a business when passed with UPDATE_SUCCESS', () => {
    const initialState = {
      updateSuccess: ''
    };
    const success = 'Business update successful!';

    const action = {
      type: UPDATE_SUCCESS,
      success
    };
    const newState = businessReducer(initialState, action);
    expect(newState.updateSuccess).toEqual('Business update successful!');
  });

  it('should not update a business when passed with UPDATE_ERROR', () => {
    const initialState = {
      updateErrors: []
    };
    const errors = ['Location is required'];

    const action = {
      type: UPDATE_ERROR,
      errors
    };
    const newState = businessReducer(initialState, action);
    expect(newState.updateErrors).toEqual(['Location is required']);
  });

  it('should show average rating for a business when passed with AVERAGE_RATING', () => {
    const initialState = {
      averageRating: 0
    };
    const ratings = 4;

    const action = {
      type: AVERAGE_RATING,
      ratings
    };
    const newState = businessReducer(initialState, action);
    expect(newState.averageRating).toEqual(4);
  });

  it('should get a user businesses when passed with USER_BUSINESSES', () => {
    const initialState = {
      userBusiness: []
    };
    const businesses = [
      {
        id: 1,
        businessName: 'andela',
        website: 'www.andela.com',
        category: 'technology',
        businessInfo: 'Lorem ipsum dolor sit amet',
        email: 'andela@gmail.com',
        businessImage: 'https://jeremiah.jpg',
        location: 'nigeria',
        createdAt: '2018-06-10T17:50:27.544Z',
        updatedAt: '2018-07-07T12:06:30.314Z',
        userId: 1
      }
    ];
    const action = {
      type: USER_BUSINESSES,
      businesses
    };
    const newState = businessReducer(initialState, action);
    expect(newState.userBusiness[0].businessName).toEqual('andela');
    expect(newState.userBusiness[0].website).toEqual('www.andela.com');
    expect(newState.userBusiness[0].email).toEqual('andela@gmail.com');
  });

  it('should show average rating for a business when passed with FOUND_BUSINESSES', () => {
    const initialState = {
      searchResults: {}
    };
    const searchResponse = {
      message: 'Businesses found'
    };
    const action = {
      type: FOUND_BUSINESSES,
      searchResponse
    };
    const newState = businessReducer(initialState, action);
    expect(newState.searchResults.message).toEqual('Businesses found');
  });

  it('should get the current business when passed with CURRENT_BUSINESS', () => {
    const initialState = {
      currentBusiness: {}
    };
    const business = {
      id: 1,
      businessName: 'andela',
      website: 'www.andela.com',
      category: 'technology',
      businessInfo: 'Lorem ipsum dolor sit amet',
      email: 'andela@gmail.com',
      businessImage: 'https://jeremiah.jpg',
      location: 'nigeria',
      createdAt: '2018-06-10T17:50:27.544Z',
      updatedAt: '2018-07-07T12:06:30.314Z',
      userId: 1
    };
    const action = {
      type: CURRENT_BUSINESS,
      business
    };
    const newState = businessReducer(initialState, action);
    expect(newState.currentBusiness.id).toEqual(1);
    expect(newState.currentBusiness.businessName).toEqual('andela');
  });

  it('should set pagination when passed with SET_PAGINATION', () => {
    const initialState = {
      pageDetails: {}
    };
    const pageDetails = {
      count: 12,
      totalPages: 3,
      currentPage: 1
    };
    const action = {
      type: SET_PAGINATION,
      pageDetails
    };
    const newState = businessReducer(initialState, action);
    expect(newState.pageDetails.count).toEqual(12);
    expect(newState.pageDetails.totalPages).toEqual(3);
    expect(newState.pageDetails.currentPage).toEqual(1);
  });

  it('should show average rating for a business when passed with DELETE_SUCCESS', () => {
    const initialState = {
      deleteSuccess: ''
    };
    const deleteSuccess = 'Business delete successful';
    const action = {
      type: DELETE_SUCCESS,
      message: deleteSuccess
    };
    const newState = businessReducer(initialState, action);
    expect(newState.deleteSuccess).toEqual('Business delete successful');
  });

  it('should return the initial state', () => {
    const initialState = {
      averageRating: 0,
      businesses: [],
      userBusiness: [],
      currentBusiness: {},
      createBusinessErrors: [],
      searchResults: {},
      pageDetails: {},
      imageUrl: '',
      imageUploadError: '',
      uploadSuccess: '',
      updateErrors: [],
      updateSuccess: '',
      deleteSuccess: ''
    };
    const action = {};
    const newState = businessReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
