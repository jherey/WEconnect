/**
 * @description - Updates loading status
 *
 * @param { Boolean } status
 *
 * @returns { status } - Action
 */
const isLoading = status => ({
  type: 'SET_API_STATUS',
  status
});

export default isLoading;
