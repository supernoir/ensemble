import { GET_ALL_PROJECTS } from '../actions/getAllProjects';

const retrieveAllProjects = (state = [], action) => {
	switch (action.type) {
		case GET_ALL_PROJECTS:
			return action.projects;
		default:
			return state;
	}
};

export default retrieveAllProjects;
