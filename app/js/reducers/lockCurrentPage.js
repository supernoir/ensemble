import { LOAD_CURRENT_PAGE } from '../actions/loadCurrentPage';

const lockCurrentPage = (state = [], action) => {
	switch (action.type) {
		case LOAD_CURRENT_PAGE:
			return action.loading;
		default:
			return state;
	}
};

export default lockCurrentPage;
