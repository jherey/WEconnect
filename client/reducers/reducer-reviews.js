export default function (state = [], action = {}) {
	switch (action.type) {
		case 'GET_REVIEWS':
			return action.reviews

		case 'POST_REVIEW':
			return [
				...state,
				action.review
			]
			
		default:
			return state;
	}
}