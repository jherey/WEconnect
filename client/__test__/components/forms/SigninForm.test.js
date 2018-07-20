import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SigninForm from '../../../components/forms/SigninForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    authUser: {
      id: 1,
      username: 'jherey'
    },
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    formDetails: { businessName: 'andela' },
  };
  return shallow(<SigninForm {...props} />);
};

describe('Component: SigninForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  });
});
