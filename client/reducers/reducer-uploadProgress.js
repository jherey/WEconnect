export default function (state = {}, action = {}) {
	switch (action.type) {
		case 'SET_PROGRESS':
			return action.progress
		default:
			return state;
	}
}