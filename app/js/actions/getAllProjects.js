/* ACTION TYPES */
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

/* ACTION CREATORS*/
export const getAllProjects = (projects = []) => {
	return {
		type: GET_ALL_PROJECTS,
		projects
	};
};
