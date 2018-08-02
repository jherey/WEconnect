import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedBusinessProfile, { BusinessProfile } from '../../../components/users/BusinessProfile.jsx';

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
    match: {
      params: {
        id: '1'
      }
    },
    currentBusiness: {
      id: 1
    },
    uploadImage: jest.fn(),
    formDetails: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    fetchBusinessAction: jest.fn(),
    fetchReviewsAction: jest.fn(),
    deleteBusinessAction: jest.fn(() => Promise.resolve()),
    deleteReviewAction: jest.fn(),
    editReviewAction: jest.fn(),
    imageUploadAction: jest.fn(() => Promise.resolve())
  };
  return shallow(<BusinessProfile {...props} />);
};


describe('Component: BusinessProfile', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('BusinessProfilePage').length).toBe(1);
  });

  it('should set business name value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'businessName',
        value: 'Andela'
      }
    };
    action.onEditChange(event);
    expect(action.state.businessName).toEqual('Andela');
  });

  it('should set review value in the state when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const event = {
      target: {
        name: 'review',
        value: 'Great place to work'
      }
    };
    action.onReviewChange(event);
    expect(action.state.review).toEqual('Great place to work');
  });

  it('should change the star rating when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const nextValue = 4;
    action.onEditStarClick(nextValue);
    expect(action.state.editedStarRating).toEqual(4);
  });

  it('should submit a review when form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const submitReview = jest.spyOn(wrapper.instance(), 'handleSubmit');
    action.handleSubmit({ preventDefault: () => 1 });
    expect(submitReview).toBeCalled();
  });

  it('should submit an edited review when edit form is submitted', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const submitEditedReview = jest.spyOn(wrapper.instance(), 'submitEditedReview');
    action.submitEditedReview({ preventDefault: () => 1 });
    expect(submitEditedReview).toBeCalled();
  });

  it('should delete a new review when review delete icon is clicked', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const deleteReview = jest.spyOn(wrapper.instance(), 'onReviewDelete');
    action.onReviewDelete({ preventDefault: () => 1 });
    expect(deleteReview).toBeCalled();
  });

  it('should delete a new business when delete icon is clicked', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const deleteBusiness = jest.spyOn(wrapper.instance(), 'onDelete');
    action.onDelete({ preventDefault: () => 1 });
    expect(deleteBusiness).toBeCalled();
  });
});

describe('componentWillMount()', () => {
  it('should return next props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const fetchBusiness = jest.spyOn(wrapper.instance(), 'componentWillMount');
    action.componentWillMount();
    expect(fetchBusiness).toBeCalled();
  });
});

describe('Edit review check', () => {
  it('should change the star rating when the value changes', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    const review = {
      id: 1,
      review: 'Love them',
      star: 3
    };
    action.switchEditReview(review);
    expect(action.state.editing).toEqual(1);
    expect(action.state.editedReview).toEqual('Love them');
    expect(action.state.editedStarRating).toEqual(3);
  });

  it('should not change the star rating when passed with null', () => {
    const wrapper = setup();

    const action = wrapper.instance();

    action.switchEditReview();
    expect(action.state.editing).toEqual(null);
  });
});

describe('Connected NewBusiness component', () => {
  it('tests that the component successfully renders', () => {
    const store = mockStore({
      authUser: {
        user: {
          id: 1,
          name: 'jherey'
        }
      },
      businesses: {
        id: 1,
        businessName: 'Andela',
        imageUrl: 'andela.com'
      },
      reviews: {
        reviews: [{
          id: 1,
          review: 'Great firm'
        }]
      }
    });
    const wrapper = shallow(<ConnectedBusinessProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
