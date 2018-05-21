/**
 * @param {*} state
 * @param {*} action
 * @returns {Object} current user
 */
export default function (state = {}, action = {}) {
  switch (action.type) {
    case 'CURRENT_USER':
      return action.user;

    default:
      return state;
  }
}
