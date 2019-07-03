/* ACTION TYPES */
export const SET_LOCALE = 'SET_LOCALE';

/* ACTION CREATORS*/
export const setLocale = locale => {
	return {
		type: SET_LOCALE,
		locale
	};
};
