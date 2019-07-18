/* ACTION TYPES */
export const GET_PROJECT_BY_ID = 'GET_PROJECT_BY_ID';

/* ACTION CREATORS*/
export const getProjectById = project => {
	return {
		type: GET_PROJECT_BY_ID,
		project
	};
};
