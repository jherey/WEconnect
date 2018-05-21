/**
 * @description - Business reducer
 *
 * @param {*} state
 * @param {*} action
 *
 * @returns { business } - State
 */
export default function businesses(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_BUSINESS':
      return [
        ...state,
        action.business
      ];

    case 'UPDATE_BUSINESS':
      return state.map((business) => {
        if (business.id === action.updatedBusiness.id) {
          return action.business;
        }
        return business;
      });

    case 'DELETE_BUSINESS':
      return state.filter(item => item.id !== action.businessId);

    case 'SET_BUSINESSES':
      return action.businesses;

    default:
      return state;
  }
}
