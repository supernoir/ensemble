import { ADD_MESSAGE } from '../actions/addMessage';

const Messenger = (state = [], action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return [
				...state,
				{
					messages: action.Messenger
				}
			];
		default:
			return state;
	}
};

export default Messenger;
;
