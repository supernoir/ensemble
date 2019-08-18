/* ACTION TYPES */
export const LOAD_CURRENT_PAGE = 'LOAD_CURRENT_PAGE';

/* ACTION CREATORS*/
export const loadCurrentPage = (loading = false) => {
	return {
		type: LOAD_CURRENT_PAGE,
		loading
	};
};
