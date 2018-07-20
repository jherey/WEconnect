import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedNewBusiness, { NewBusiness } from '../../../components/users/NewBusiness.jsx';

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
    createBusinessAction: jest.fn(),
    imageUploadAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<NewBusiness {...props} />);
};


describe('Component: NewBusiness', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('NewBusinessForm').length).toBe(1);
  });

  it('should set username value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'businessName',
        value: 'Andela'
      }
    };
    action.onChange(event);
    expect(action.state.businessName).toEqual('Andela');
  });

  it('should set password value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'Website',
        value: 'www.andela.com'
      }
    };
    action.onChange(event);
    expect(action.state.Website).toEqual('www.andela.com');
  });

  it('should upload business image', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const newBusiness = jest.spyOn(wrapper.instance(), 'uploadImage');
    action.uploadImage({ target: { files: ['1'] } });
    expect(newBusiness).toBeCalled();
  });

  it('should register a new business when form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const newBusiness = jest.spyOn(wrapper.instance(), 'onSubmit');
    action.onSubmit({ preventDefault: () => 1 });
    expect(newBusiness).toBeCalled();
  });
});

describe('Connected NewBusiness component', () => {
  it('tests that the component successfully renders', () => {
    const store = mockStore({
      authUser: {
        id: 1,
        name: 'jherey'
      },
      businesses: {
        id: 1,
        businessName: 'Andela',
        imageUrl: 'andela.com'
      }
    });
    const wrapper = shallow(<ConnectedNewBusiness store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
