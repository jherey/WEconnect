/**
 * @param {*} message
 * @returns {Object} type, message
 */
export function addFlashMessage(message) {
  return {
    type: 'ADD_FLASH_MESSAGE',
    message
  };
}
