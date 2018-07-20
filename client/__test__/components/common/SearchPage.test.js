import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedSearchPage, { SearchPage } from '../../../components/common/SearchPage.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });

describe('Component: SearchPage', () => {
  let props;
  const setup = () => {
    props = {
      authUser: {
        id: 1,
        username: 'jherey'
      },
      searchResults: {
        allBusinesses: {
          rows: [{
            id: 1,
            businessName: 'Andela',
            website: 'www.andela.com',
            description: 'We provide the best tech talent',
            category: 'Technology',
            User: {
              username: 'jherey'
            }
          }]
        }
      },
      paginate: {
        count: 4
      },
      searchAction: jest.fn()
    };

    return shallow(<SearchPage {...props} />);
  };

  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h3').length).toBe(1);
  });
});

describe('Component: SearchPage', () => {
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
      },
      searchResults: {
        allBusinesses: {
          rows: []
        }
      },
      searchType: 'name',
      searchAction: jest.fn(),
      paginate: {
        count: 10,
        totalPages: 2,
        currentPage: 1
      }
    };
    return shallow(<SearchPage {...props} />);
  };

  it('should render no business found', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(1);
  });
});

describe('Component: SearchPage', () => {
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
      },
      searchResults: {
        allBusinesses: {
          rows: [{
            id: 1,
            businessName: 'Andela',
            website: 'www.andela.com',
            User: {
              username: 'jherey'
            }
          }]
        }
      },
      searchType: 'name',
      searchAction: jest.fn(),
      paginate: {
        count: 10,
        totalPages: 2,
        currentPage: 1
      }
    };
    return shallow(<SearchPage {...props} />);
  };

  it('should render pagination on component', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h3').length).toBe(1);
  });

  it('should change the star rating when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const page = {
      selected: 1
    };
    const pageChange = jest.spyOn(wrapper.instance(), 'onPageChange');
    action.onPageChange(page);
    expect(pageChange).toBeCalled();
  });
});

describe('Component: SearchPage', () => {
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
      },
      searchResults: jest.fn()
    };
    return shallow(<SearchPage {...props} />);
  };

  it('should render error if allBusinesses is undefined', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  });
});

describe('Connected Signin component', () => {
  it('tests that the component successfully renders', () => {
    const store = mockStore({
      businesses: {
        searchResults: {
          message: 'Businesses found!',
          rows: [{
            id: 1,
            businessName: 'Andela',
            website: 'www.andela.com',
            description: 'We provide the best tech talent',
            category: 'Technology',
            User: {
              username: 'jherey'
            }
          }]
        },
        searchType: 'name',
        paginate: {}
      }
    });
    const wrapper = shallow(<ConnectedSearchPage store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

