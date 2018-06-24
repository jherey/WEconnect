import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import { expect } from 'chai';
import expect from 'expect';
import * as businessActions from '../../actions/businessActions';

const businessData = {
  businessName: 'Microsoft',
  website: 'www.microsoft.com',
  businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  email: 'microsoft@gmail.com',
  location: 'nigeria',
};

const businessId = 1;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async business actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Create business action', () => {
    it('should create a business', () => {
      // moxios.wait(() => {
      //   const request = moxios.requests.mostRecent();
      //   request.respondWith({
      //     status: 201,
      //     response: {
      //       data: { businessData }
      //     }
      //   });
      // });
      moxios.stubRequest('/api/v1/businesses', {
        status: 201,
        response: {
          data: { businessData }
        }
      });

      const expectedAction = [
        { type: 'SET_API_STATUS', status: true },
        { type: 'ADD_BUSINESS' },
        { type: 'SET_API_STATUS', status: false }
      ];

      const store = mockStore({ business: [] });

      return store.dispatch(businessActions.createBusiness(businessData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        })
        .catch(error => error);
    });
  });

  describe('Get business action', () => {
    it('should get a business', () => {
      moxios.stubRequest('/api/v1/businesses/1', {
        status: 200,
        response: {
          data: { businessData }
        }
      });

      const expectedAction = [
        { type: 'SET_API_STATUS', status: true },
        { type: 'ONE_BUSINESS' },
        { type: 'SET_API_STATUS', status: false }
      ];

      const store = mockStore({ business: [] });

      return store.dispatch(businessActions.fetchBusiness(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  // describe('Update business action', () => {
  //   it('should update a business', () => {
  //     moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
  //       status: 200,
  //       response: {
  //         data: {
  //           message: 'Business Update Successful'
  //         }
  //       }
  //     });

  //     const expectedAction = [
  //       { type: 'SET_API_STATUS', status: true },
  //       { type: 'SET_API_STATUS', status: false }
  //     ];

  //     const store = mockStore({ business: [] });

  //     return store.dispatch(businessActions.updateBusiness(businessData))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedAction);
  //       });
  //   });
  // });

  describe('Delete business action', () => {
    it('should delete a business', () => {
      moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
        status: 200,
        response: {
          data: {
            message: 'Business Successfully Deleted!'
          }
        }
      });

      const expectedAction = [
        { type: 'SET_API_STATUS', status: true },
        { type: 'SET_API_STATUS', status: false }
      ];

      const store = mockStore({ business: [] });

      return store.dispatch(businessActions.deleteBusiness(businessData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  describe('Get all business by page action', () => {
    it('should get all businesses by page', () => {
      moxios.stubRequest('/api/v1/businesses?pageNum=1', {
        status: 200,
        response: {
          data: {
            message: 'Businesses found!'
          }
        }
      });

      const expectedAction = [
        { type: 'SET_API_STATUS', status: true },
        { type: 'SET_BUSINESSES', status: true },        
        { type: 'SET_API_STATUS', status: false }
      ];

      const store = mockStore({ });

      return store.dispatch(businessActions.getAllBusinesses(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
});


// describe('dskabnkdsuansd', () => {
// it('creates ADD_BUSINESS action after registering a new business', () => {
//   moxios.stubRequest(
//     '/api/v1/businesses',
//     {
//       status: 201,
//       businessData
//     }
//   );
//   const store = mockStore({});

// moxios.stubRequest('/api/v1/businesses', {
//   status: 201,
//   response: {
//     data: { businessData }
//   }
// });

//   const business = businessData.business;
//   const expectedAction = {
//     type: 'ADD_BUSINESS',
//     business
//   };

//   await store.dispatch(createBusiness({
//     businessName: 'andela23',
//     website: 'www.andela.com',
//     businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     address: null,
//     email: 'andela23@gmail.com',
//     businessImage: 'null',
//     location: 'nigeria'
//   }));
//   expect(store.getActions()[0]).toEqual(expectedAction);
// });

//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 201,
//         businessData
//       });
//     });

//     const { business } = businessData;
//     const expectedAction = {
//       type: 'ADD_BUSINESS',
//       business
//     };

//     return store.dispatch(createBusiness({
//       businessName: 'andela23',
//       website: 'www.andela.com',
//       businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//       address: 'null',
//       email: 'andela23@gmail.com',
//       businessImage: 'null',
//       location: 'nigeria'
//     }).then(() => {
//       expect(store.getActions()).toEqual(expectedAction);
//     }));
//   });
//   // });
// });

// describe('When I call the get business action', () => {
//   it('Then it should dispatch an action to get a business', () => {
//     fetchMock.get(
//       '/api/v1/businesses/1',
//       {
//         status: 200,
//         body: JSON.stringify({
//           message: 'Business Found',
//           businessData
//         })
//       }
//     );
//     const expectedAction = {
//       type: 'ONE_BUSINESS',
//       businessData
//     };
//     const store = mockStore({});
//     store.dispatch(createBusiness(businessData))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedAction);
//       })
//       .catch(error => error);
//   });
// });
// });

// describe('business actions', () => {
// it('action to set the upload progress of an image', () => {
//   const progress = '57';
//   const expectedAction = {
//     type: 'SET_PROGRESS',
//     progress
//   };
//   expect(businessActions.setProgress(progress)).toEqual(expectedAction);
// });

// it('action to add a new business', () => {
//   const business = {
//     id: 1,
//     businessName: 'Microsoft',
//     category: 'technology',
//     email: 'microsoft.com',
//     location: 'United States'
//   };
//   const expectedAction = {
//     type: 'ADD_BUSINESS',
//     business
//   };
//   expect(addBusiness(business)).toEqual(expectedAction);
// });

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
