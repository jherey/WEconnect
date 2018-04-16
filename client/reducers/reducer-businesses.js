export default function businesses(state = [], action = {}) {
	switch (action.type) {
		case 'ADD_BUSINESS':
			return [
				...state,
				action.business
			]

		case 'UPDATE_BUSINESS':
			return state.map(item => {
				if (item.id === action.updatedBusiness) {
					return action.business;
				}
				return item;
			})

		case 'DELETE_BUSINESS':
			return state.filter(item => item.id !== action.businessId);

		case 'SET_BUSINESSES':
			return action.businesses
			
		default:
			return state;
	}
}