export default function(state = {}, action = {}) {
	switch (action.type) {
		case 'ONE_BUSINESS':
			return action.business
		default:
			return state;
	}
}