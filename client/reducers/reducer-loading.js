/**
 * @param {*} state
 *
 * @param {*} action
 *
 * @returns {Object} api status
 */
export default function (state = false, action = {}) {
  switch (action.type) {
    case 'SET_API_STATUS':
      return action.status;

    default:
      return state;
  }
}
