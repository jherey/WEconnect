/**
 * @param {*} state
 * @param {*} action
 * @returns {Object} current user
 */
export default function (state = [], action = {}) {
  switch (action.type) {
    case 'USER_BUSINESSES':
      return action.businesses;

    default:
      return state;
  }
}
