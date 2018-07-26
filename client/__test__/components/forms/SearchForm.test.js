import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchForm from '../../../components/forms/SearchForm.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    formDetails: { businessName: 'andela' },
    onSubmit: jest.fn(),
    onChange: jest.fn()
  };
  return shallow(<SearchForm {...props} />);
};

describe('Component: SearchForm', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
});
