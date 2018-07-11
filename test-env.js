import $ from 'jquery';

global.$ = global.jQuery = $;
window.jQuery = $;

global.$ = () => ({
  removeClass: () => {},
  click: () => {},
  hide: () => {},
  show: () => {},
  modal: () => {}
});

const props = { history: [] };

// Make Enzyme functions available in all test files without importing
global.props = props;

global.window = window;
