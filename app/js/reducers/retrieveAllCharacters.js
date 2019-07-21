import { GET_ALL_CHARACTERS } from '../actions/getAllCharacters';

const retrieveAllCharacters = (state = [], action) => {
	switch (action.type) {
		case GET_ALL_CHARACTERS:
			return action.characters;
		default:
			return state;
	}
};

export default retrieveAllCharacters;
