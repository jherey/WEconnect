import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewBusinessForm from '../../../components/forms/NewBusinessForm.jsx';

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
    Business: jest.fn()
  };
  return shallow(<NewBusinessForm {...props} />);
};

describe('Component: NewBusinessForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(17);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
});
