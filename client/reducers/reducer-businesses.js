/**
 * @description - Business reducer
 *
 * @param {*} state
 * @param {*} action
 *
 * @returns { business } - State
 */

const initialState = {
  businesses: [],
  count: 0
};
export default function businesses(state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_BUSINESS':
      return {
        businesses: [...state.businesses, ...action.business]
      };

    case 'UPDATE_BUSINESS':
      return state.map((business) => {
        if (business.id === action.updatedBusiness.id) {
          return action.business;
        }
        return business;
      });

    case 'DELETE_BUSINESS':
      return state.filter(business => business.id !== action.businessId);

    case 'SET_BUSINESSES':
      return {
        businesses: action.businesses.rows,
        count: action.businesses.count
      };

    default:
      return state;
  }
}


// const initialState = {
//   businesses: [],
//   count: 0
// }
// export default function businesses(state =initialState, action = {}) {
//   switch (action.type) {
//     case 'ADD_BUSINESS':
//       return [
//         ...state,
//         action.business
//       ];

//     case 'UPDATE_BUSINESS':
//       return state.map((business) => {
//         if (business.id === action.updatedBusiness.id) {
//           return action.business;
//         }
//         return business;
//       });

//     case 'DELETE_BUSINESS':
//       return state.filter(business => business.id !== action.businessId);

//     case 'SET_BUSINESSES':
//       return action.businesses;

//     default:
//       return state;
//   }
// }
