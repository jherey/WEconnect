import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../../components/common/Footer.jsx';

configure({ adapter: new Adapter() });

describe('Component: Footer', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
  });
});
