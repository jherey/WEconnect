export function isLoading(status) {
	return {
		type: 'SET_API_STATUS',
		status
	};
}