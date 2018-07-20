import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Business from '../../../components/common/Business.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    id: 1,
    name: 'Andela',
    description: 'We provide the best tech talent',
    businessImage: 'andela.jpg',
    category: 'Technology',
    authUser: {
      id: 1,
      username: 'jherey'
    }
  };
  return shallow(<Business {...props} />);
};

describe('Component: Business', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('p').length).toBe(3);
    expect(wrapper.find('TextTruncate').length).toBe(1);
  });
});
