import { SET_LOCALE } from '../actions/setLocale';

const switchLocale = (state = [], action) => {
	switch (action.type) {
		case SET_LOCALE:
			return [...state, action.locale];
		default:
			return state;
	}
};

export default switchLocale;