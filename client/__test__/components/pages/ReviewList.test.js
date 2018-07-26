import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReviewList from '../../../components/pages/ReviewList.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onReviewChange: jest.fn(),
    formDetails: {},
    onEditStarClick: jest.fn(),
    submitEditedReview: jest.fn(),
    reviews: [{
      id: 1,
      review: 'Good firm',
      reviewer: jest.fn()
    }],
    user: {
      isAuthenticated: false
    },
    editingReviewId: 1,
    switchEditReview: jest.fn(),
    onReviewDelete: jest.fn(),
    setToDeleteReview: jest.fn()
  };
  return shallow(<ReviewList {...props} />);
};

describe('Component: ReviewList', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
  });
});
