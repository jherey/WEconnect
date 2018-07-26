import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProfile from '../../../components/pages/UserProfile.jsx';

configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    currentUser: {
      id: 1,
      username: 'jherey'
    },
    image: 'jherey.jpg'
  };
  return shallow(<UserProfile {...props} />);
};

describe('Component: UserProfile', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('p').length).toBe(3);
    expect(wrapper.find('button').length).toBe(1);
  });
});
