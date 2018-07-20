import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedNavbar, { Navbar } from '../../../components/common/Navbar.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    authUser: {
      id: 1
    },
    isLoading: jest.fn(),
    uploadImage: jest.fn(),
    formDetails: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    signinUserAction: jest.fn(),
    searchBusiness: jest.fn(),
    signoutAction: jest.fn(),
    imageUploadAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<Navbar {...props} />);
};


describe('Component: Navbar', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('SearchForm').length).toBe(1);
  });

  it('should set keyword value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'keyword',
        value: 'andela'
      }
    };
    action.onChange(event);
    expect(action.state.keyword).toEqual('andela');
  });

  it('should set type value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'type',
        value: 'name'
      }
    };
    action.onChange(event);
    expect(action.state.type).toEqual('name');
  });

  it('should signin user when form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const search = jest.spyOn(wrapper.instance(), 'onSubmit');
    action.onSubmit({ preventDefault: () => 1 });
    expect(search).toBeCalled();
  });
});

describe('Connected Signin component', () => {
  it('tests that the component successfully renders', () => {
    const store = mockStore({
      authUser: {
        id: 1
      }
    });
    const wrapper = shallow(<ConnectedNavbar store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
