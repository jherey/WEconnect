import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from '../../../components/common/Spinner.jsx';

configure({ adapter: new Adapter() });

describe('Component: Spinner', () => {
  it('tests that the component is successfully rendered', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div').length).toBe(1);
  });
});
