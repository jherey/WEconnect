import expect from 'expect';
import * as businessActions from '../../actions/businessActions';

describe('business actions', () => {
  it('action to set the upload progress of an image', () => {
    const progress = '57';
    const expectedAction = {
      type: 'SET_PROGRESS',
      progress
    };
    expect(businessActions.setProgress(progress)).toEqual(expectedAction);
  });

  it('action to add a new business', () => {
    const business = {
      id: 1,
      businessName: 'Microsoft',
      category: 'technology',
      email: 'microsoft.com',
      location: 'United States'
    };
    const expectedAction = {
      type: 'ADD_BUSINESS',
      business
    };
    expect(businessActions.addBusiness(business)).toEqual(expectedAction);
  });

  it('action to get a business', () => {
    const business = {
      id: 1,
      businessName: 'Microsoft',
      category: 'technology',
      email: 'microsoft.com',
      location: 'United States'
    };
    const expectedAction = {
      type: 'ONE_BUSINESS',
      business
    };
    expect(businessActions.getOneBusiness(business)).toEqual(expectedAction);
  });

  it('action to update a business', () => {
    const updatedBusiness = {
      id: 1,
      businessName: 'Microsoft Nigeria',
      category: 'technology',
      email: 'microsoft.ng.com',
      location: 'Nigeria'
    };
    const expectedAction = {
      type: 'UPDATE_BUSINESS',
      updatedBusiness
    };
    expect(businessActions.businessUpdated(updatedBusiness)).toEqual(expectedAction);
  });

  it('action to get all businesses', () => {
    const businesses = [
      {
        id: 1,
        businessName: 'Microsoft Nigeria',
        category: 'technology',
        email: 'microsoft.ng.com',
        location: 'Nigeria'
      }
    ];
    const expectedAction = {
      type: 'SET_BUSINESSES',
      businesses
    };
    expect(businessActions.allBusinesses(businesses)).toEqual(expectedAction);
  });

  it('action to search for businesses by location or category', () => {
    const businesses = [
      {
        id: 1,
        businessName: 'Microsoft Nigeria',
        category: 'technology',
        email: 'microsoft.ng.com',
        location: 'Nigeria'
      }
    ];
    const expectedAction = {
      type: 'FOUND_BUSINESSES',
      businesses
    };
    expect(businessActions.businessFound(businesses)).toEqual(expectedAction);
  });
});
