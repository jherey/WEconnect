import $ from 'jquery';

global.$ = global.jQuery = $; // eslint-disable-line no-multi-assign
window.jQuery = $;

global.$ = () => ({
  click: () => {},
  modal: () => {}
});

document.getElementById = jest.fn(() => ({
  click: jest.fn()
}));

global.event = {
  preventDefault: jest.fn(),
  target: {
    getAttribute: jest.fn(),
    files: [{
      type: ''
    }],
    parentNode: {
      getAttribute: jest.fn()
    }
  }
};

global.toastr = {
  error: jest.fn()
};

const props = { history: [] };
global.props = props;

global.window = window;
