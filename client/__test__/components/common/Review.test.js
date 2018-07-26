import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Review from '../../../components/common/Review.jsx';

configure({ adapter: new Adapter() });

let props;
const setup1 = () => {
  props = {
    submitEditedReview: jest.fn(),
    formDetails: { businessName: 'andela' },
    onReviewChange: jest.fn(),
    switchEditReview: jest.fn(),
    starRating: 2,
    onEditStarClick: jest.fn(),
    review: {
      id: 1,
      review: 'Good firm',
      reviewer: jest.fn()
    },
    user: {
      user: jest.fn()
    },
    editingReviewId: 2,
    onReviewDelete: jest.fn(),
    setToDeleteReview: jest.fn()
  };
  return shallow(<Review {...props} />);
};

const setup2 = () => {
  props = {
    submitEditedReview: jest.fn(),
    formDetails: { businessName: 'andela' },
    onReviewChange: jest.fn(),
    switchEditReview: jest.fn(),
    starRating: 2,
    onEditStarClick: jest.fn(),
    review: {
      id: 1,
      review: 'Good firm',
      reviewer: jest.fn()
    },
    user: {
      user: jest.fn()
    },
    editingReviewId: 1,
    onReviewDelete: jest.fn(),
    setToDeleteReview: jest.fn()
  };
  return shallow(<Review {...props} />);
};

describe('Component: Review', () => {
  it('should render the component successfully', () => {
    const wrapper = setup1();
    expect(wrapper.find('div').length).toBe(13);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});

describe('Component: Review', () => {
  it('should render the edit component successfully', () => {
    const wrapper = setup2();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('EditReviewForm').length).toBe(1);
  });
});
