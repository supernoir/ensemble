/* ACTION TYPES */
export const SET_LOCALE = 'SET_LOCALE';

/* ACTION CREATORS*/
export const setLocale = message => {
	return {
		type: SET_LOCALE,
		message
	};
};
