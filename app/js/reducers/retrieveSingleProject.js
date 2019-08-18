import { GET_SINGLE_PROJECT } from '../actions/getSingleProject';

const retrieveSingleProject = (state = [], action) => {
	switch (action.type) {
		case GET_SINGLE_PROJECT:
			return action.project;
		default:
			return state;
	}
};

export default retrieveSingleProject;
