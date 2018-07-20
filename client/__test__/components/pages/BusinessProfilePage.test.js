import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BusinessProfilePage from '../../../components/pages/BusinessProfilePage.jsx';

configure({ adapter: new Adapter() });

let props;
const setup1 = () => {
  props = {
    currentBusiness: {
      userId: 1
    },
    id: 1,
    userId: 1,
    onStarClick: jest.fn(),
    handleSubmit: jest.fn(),
    averageRating: 3,
    authUser: {
      id: 1,
      username: 'jherey'
    },
    onDelete: jest.fn(),
    onReviewChange: jest.fn(),
    reviews: [{
      id: 1,
      review: 'Good firm',
      reviewer: jest.fn()
    }],
    editingReviewId: 1,
    switchEditReview: jest.fn(),
    setToDeleteReview: jest.fn(),
    onReviewDelete: jest.fn(),
    submitEditedReview: jest.fn(),
    onEditStarClick: jest.fn(),
    formDetails: {},
  };
  return shallow(<BusinessProfilePage {...props} />);
};

const setup2 = () => {
  props = {
    currentBusiness: {
      userId: 1
    },
    id: 1,
    userId: 1,
    onStarClick: jest.fn(),
    handleSubmit: jest.fn(),
    averageRating: 3,
    authUser: {
      id: 1,
      username: 'jherey',
      isLoading: true
    },
    onDelete: jest.fn(),
    onReviewChange: jest.fn(),
    reviews: [{
      id: 1,
      review: 'Good firm',
      reviewer: jest.fn()
    }],
    editingReviewId: 1,
    switchEditReview: jest.fn(),
    setToDeleteReview: jest.fn(),
    onReviewDelete: jest.fn(),
    submitEditedReview: jest.fn(),
    onEditStarClick: jest.fn(),
    formDetails: {},
  };
  return shallow(<BusinessProfilePage {...props} />);
};

describe('Component: BusinessProfilePage', () => {
  it('should render the component successfully', () => {
    const wrapper = setup1();
    expect(wrapper.find('div').length).toBe(24);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});

describe('Component: BusinessProfilePage', () => {
  it('should render the component successfully', () => {
    const wrapper = setup2();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('Spinner').length).toBe(1);
  });
});
