/**
 * @param {*} state
 *
 * @param {*} action
 *
 * @returns {Object} progress value
 */
export default function (state = 0, action = {}) {
  switch (action.type) {
    case 'SET_PROGRESS':
      return action.progress;
    default:
      return state;
  }
}
