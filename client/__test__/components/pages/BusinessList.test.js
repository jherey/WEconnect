import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BusinessList from '../../../components/pages/BusinessList.jsx';

configure({ adapter: new Adapter() });

let props;
const setup1 = () => {
  props = {
    businesses: {
      allBusinesses: {
        rows: [{
          id: 1,
          businessName: 'Andela',
          User: {
            id: 2,
            username: 'jherey'
          }
        }]
      }
    }
  };
  return shallow(<BusinessList {...props} />);
};

const setup2 = () => {
  props = {
    businesses: {}
  };
  return shallow(<BusinessList {...props} />);
};

describe('Component: BusinessList', () => {
  it('should render the component successfully', () => {
    const wrapper = setup1();
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('Business').length).toBe(1);
  });
});

describe('Component: BusinessList', () => {
  it('should render the component successfully', () => {
    const wrapper = setup2();
    expect(wrapper.find('Spinner').length).toBe(1);
  });
});
