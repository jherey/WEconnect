import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewReviewForm from '../../../components/forms/NewReviewForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onReviewChange: jest.fn(),
    handleSubmit: jest.fn(),
    starRating: 2,
    onStarClick: jest.fn()
  };
  return shallow(<NewReviewForm {...props} />);
};

describe('Component: NewReviewForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});
