/* ACTION TYPES */
export const GET_ALL_CHARACTERS = 'GET_ALL_CHARACTERS';

/* ACTION CREATORS*/
export const getAllCharacters = characters => {
	return {
		type: GET_ALL_CHARACTERS,
		characters
	};
};
