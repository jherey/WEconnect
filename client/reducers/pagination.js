/**
 * @param {*} state
 * @param {*} action
 * @returns {Object} current user
 */
export default function (state = {}, action = {}) {
  switch (action.type) {
    case 'SET_PAGINATION':
      return action.pageDetails;

    default:
      return state;
  }
}
