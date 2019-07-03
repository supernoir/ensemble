import { combineReducers } from 'redux';
import Messenger from './Messenger';
import switchLocale from './switchLocale';

export const rootReducer = combineReducers({
	Messenger,
	switchLocale
});

export default rootReducer;