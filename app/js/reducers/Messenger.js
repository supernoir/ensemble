import { ADD_MESSAGE } from '../actions/addMessage';

const Messenger = (state = [], action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return [
				...state,
				 action.message
			];
		default:
			return state;
	}
};

export default Messenger;

