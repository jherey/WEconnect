import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditBusinessForm from '../../../components/forms/EditBusinessForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    id: '1',
    authUser: {
      id: 1,
      username: 'jherey'
    },
    uploadImage: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    formDetails: { businessName: 'andela' },
    updateBusiness: jest.fn()
  };
  return shallow(<EditBusinessForm {...props} />);
};

describe('Component: EditBusinessForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(17);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(5);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
