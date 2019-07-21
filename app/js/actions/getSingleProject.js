/* ACTION TYPES */
export const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT';

/* ACTION CREATORS*/
export const getSingleProject = project => {
	return {
		type: GET_SINGLE_PROJECT,
		project
	};
};
