import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import {
  createBusiness,
  fetchBusiness
} from '../../actions/businessActions';
import mockData from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const {
  businessData,
  bookData
} = mockData;

describe('Business actions', () => {
  describe('When I call the add business action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('Then it should dispatch an action to add business', () => {
      fetchMock.post(
        '/api/v1/businesses',
        {
          status: 201,
          body: JSON.stringify({
            message: 'Business created successfully',
            businessData
          })
        }
      );
      const expectedAction = {
        type: 'ADD_BUSINESS',
        businessData
      };
      const store = mockStore({});
      store.dispatch(createBusiness(businessData))
        .then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        })
        .catch(error => error);
    });
  });

  describe('When I call the get business action', () => {
    it('Then it should dispatch an action to get a business', () => {
      fetchMock.post(
        '/api/v1/businesses/1',
        {
          status: 200,
          body: JSON.stringify({
            message: 'Business Found',
            businessData
          })
        }
      );
      const expectedAction = {
        type: 'ONE_BUSINESS',
        businessData
      };
      const store = mockStore({});
      store.dispatch(createBusiness(businessData))
        .then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        })
        .catch(error => error);
    });
  });
});

// describe('business actions', () => {
//   it('action to set the upload progress of an image', () => {
//     const progress = '57';
//     const expectedAction = {
//       type: 'SET_PROGRESS',
//       progress
//     };
//     expect(businessActions.setProgress(progress)).toEqual(expectedAction);
//   });

//   it('action to add a new business', () => {
//     const business = {
//       id: 1,
//       businessName: 'Microsoft',
//       category: 'technology',
//       email: 'microsoft.com',
//       location: 'United States'
//     };
//     const expectedAction = {
//       type: 'ADD_BUSINESS',
//       business
//     };
//     expect(businessActions.addBusiness(business)).toEqual(expectedAction);
//   });

//   it('action to get a business', () => {
//     const business = {
//       id: 1,
//       businessName: 'Microsoft',
//       category: 'technology',
//       email: 'microsoft.com',
//       location: 'United States'
//     };
//     const expectedAction = {
//       type: 'ONE_BUSINESS',
//       business
//     };
//     expect(businessActions.getOneBusiness(business)).toEqual(expectedAction);
//   });

//   it('action to update a business', () => {
//     const updatedBusiness = {
//       id: 1,
//       businessName: 'Microsoft Nigeria',
//       category: 'technology',
//       email: 'microsoft.ng.com',
//       location: 'Nigeria'
//     };
//     const expectedAction = {
//       type: 'UPDATE_BUSINESS',
//       updatedBusiness
//     };
//     expect(businessActions.businessUpdated(updatedBusiness)).toEqual(expectedAction);
//   });

//   it('action to get all businesses', () => {
//     const businesses = [
//       {
//         id: 1,
//         businessName: 'Microsoft Nigeria',
//         category: 'technology',
//         email: 'microsoft.ng.com',
//         location: 'Nigeria'
//       }
//     ];
//     const expectedAction = {
//       type: 'SET_BUSINESSES',
//       businesses
//     };
//     expect(businessActions.allBusinesses(businesses)).toEqual(expectedAction);
//   });

//   it('action to search for businesses by location or category', () => {
//     const businesses = [
//       {
//         id: 1,
//         businessName: 'Microsoft Nigeria',
//         category: 'technology',
//         email: 'microsoft.ng.com',
//         location: 'Nigeria'
//       }
//     ];
//     const expectedAction = {
//       type: 'FOUND_BUSINESSES',
//       businesses
//     };
//     expect(businessActions.businessFound(businesses)).toEqual(expectedAction);
//   });
// });
