/**
 * @param {*} state
 *
 * @param {*} action
 *
 * @returns {Object} all users
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case 'ALL_USERS':
      return action.users;

    default:
      return state;
  }
};
