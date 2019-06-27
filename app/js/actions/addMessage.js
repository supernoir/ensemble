/* ACTION TYPES */
export const ADD_MESSAGE = 'ADD_MESSAGE';

/* ACTION CREATORS*/
export const addMessage = message => {
	return {
		type: ADD_MESSAGE,
		message
	};
};