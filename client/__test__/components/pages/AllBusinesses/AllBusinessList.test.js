import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllBusinessList from '../../../../components/pages/AllBusinesses/AllBusinessList.jsx';

configure({ adapter: new Adapter() });

let props;
const setup1 = () => {
  props = {
    businesses: {
      allBusinesses: {
        rows: [{
          id: 1,
          businessName: 'Andela',
          businessInfo: 'Great place to work',
          category: 'technology',
          User: {
            id: 2,
            username: 'jherey'
          }
        }]
      }
    }
  };
  return shallow(<AllBusinessList {...props} />);
};

const setup2 = () => {
  props = {
    businesses: {}
  };
  return shallow(<AllBusinessList {...props} />);
};

describe('Component: AllBusinessList', () => {
  it('should render the component successfully', () => {
    const wrapper = setup1();
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('Business').length).toBe(1);
  });
});

describe('Component: AllBusinessList', () => {
  it('should render the component successfully', () => {
    const wrapper = setup2();
    expect(wrapper.find('Spinner').length).toBe(1);
  });
});
