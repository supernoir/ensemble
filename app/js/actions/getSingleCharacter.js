/* ACTION TYPES */
export const GET_SINGLE_CHARACTER = 'GET_SINGLE_CHARACTER';

/* ACTION CREATORS*/
export const getSingleCharacter = character => {
	return {
		type: GET_SINGLE_CHARACTER,
		character
	};
};
