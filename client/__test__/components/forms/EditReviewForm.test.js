import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditReviewForm from '../../../components/forms/EditReviewForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    onReviewChange: jest.fn(),
    submitEditedReview: jest.fn(),
    onEditStarClick: jest.fn(),
    formDetails: { editedReview: 'hello' }
  };
  return shallow(<EditReviewForm {...props} />);
};

describe('Component: EditReviewForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});
