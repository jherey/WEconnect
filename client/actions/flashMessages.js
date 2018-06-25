import { ADD_FLASH_MESSAGE } from './types';

/**
 * @description - Display flash message
 *
 * @param {*} message
 *
 * @returns {Object} type, message
 */
const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

export default addFlashMessage;
