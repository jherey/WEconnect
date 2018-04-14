export default function businesses(state = [], action = {}) {
	switch (action.type) {
		case 'ADD_BUSINESS':
			return [
				...state,
				action.business
			]
		case 'SET_BUSINESSES':
			return action.businesses
		default:
			return state;
	}
}