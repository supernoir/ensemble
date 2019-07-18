import { combineReducers } from 'redux';
import Messenger from './Messenger';
import switchLocale from './switchLocale';
import retrieveSingleProject from './retrieveSingleProject';
import retrieveAllProjects from './retrieveAllProjects';

export const rootReducer = combineReducers({
	Messenger,
	switchLocale,
	retrieveSingleProject,
	retrieveAllProjects
});

export default rootReducer;
