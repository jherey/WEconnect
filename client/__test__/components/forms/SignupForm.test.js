import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignupForm from '../../../components/forms/SignupForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    authUser: {
      id: 1,
      username: 'jherey'
    },
    uploadImage: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    formDetails: { businessName: 'andela' },
  };
  return shallow(<SignupForm {...props} />);
};

describe('Component: SignupForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(17);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
    expect(wrapper.find('button').length).toBe(1);
  });
});
