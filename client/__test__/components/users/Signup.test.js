import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedSignup, { Signup } from '../../../components/users/Signup.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

let props;
const setup = () => {
  props = {
    authUser: {
      id: 1,
      name: 'jherey'
    },
    uploadImage: jest.fn(),
    formDetails: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    signupUserAction: jest.fn(),
    imageUploadAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<Signup {...props} />);
};


describe('Component: Signup', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('SignupForm').length).toBe(1);
  });

  it('should set username value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'username',
        value: 'jherey'
      }
    };
    action.onChange(event);
    expect(action.state.username).toEqual('jherey');
  });

  it('should set password value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'password',
        value: 'jherey'
      }
    };
    action.onChange(event);
    expect(action.state.password).toEqual('jherey');
  });

  it('should upload user image', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const signUp = jest.spyOn(wrapper.instance(), 'uploadImage');
    action.uploadImage({ target: { files: ['1'] } });
    expect(signUp).toBeCalled();
  });

  it('should signup user when form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const signUp = jest.spyOn(wrapper.instance(), 'onSubmit');
    action.onSubmit({ preventDefault: () => 1 });
    expect(signUp).toBeCalled();
  });
});

describe('componentWillReceiveProps()', () => {
  const nextProps = {
    authUser: {
      imageUrl: 'www.jherey.com'
    }
  };
  it('should return next props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const signUp = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    action.componentWillReceiveProps(nextProps);
    expect(signUp).toBeCalled();
  });
});

describe('Connected Signup component', () => {
  it('tests that the component successfully renders', () => {
    const store = mockStore({
      authUser: {
        id: 1,
        name: 'jherey'
      }
    });
    const wrapper = shallow(<ConnectedSignup store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
