export default function (state = [], action = {}) {
	switch (action.type) {
		case 'FOUND_BUSINESSES':
			return action.businesses

		default:
			return state;
	}
}