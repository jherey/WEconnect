import $ from 'jquery';

global.$ = global.jQuery = $; // eslint-disable-line no-multi-assign
window.jQuery = $;

global.$ = () => ({
  click: () => {},
  modal: () => {}
});

const props = { history: [] };
global.props = props;

global.window = window;
