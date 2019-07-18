import { GET_PROJECT_BY_ID } from '../actions/getProjectbyId';

const retrieveSingleProject = (state = [], action) => {
	switch (action.type) {
		case GET_PROJECT_BY_ID:
			return action.project;
		default:
			return state;
	}
};

export default retrieveSingleProject;
