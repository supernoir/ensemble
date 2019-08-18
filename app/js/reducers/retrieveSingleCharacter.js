import { GET_SINGLE_CHARACTER } from '../actions/getSingleCharacter';

const retrieveSingleCharacter = (state = [], action) => {
	switch (action.type) {
		case GET_SINGLE_CHARACTER:
			return action.character;
		default:
			return state;
	}
};

export default retrieveSingleCharacter;
