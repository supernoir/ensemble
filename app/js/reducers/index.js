import { combineReducers } from 'redux';
import Messenger from './Messenger';
import switchLocale from './switchLocale';
import retrieveSingleProject from './retrieveSingleProject';
import retrieveAllProjects from './retrieveAllProjects';
import lockCurrentPage from './lockCurrentPage';

export const rootReducer = combineReducers({
	Messenger,
	switchLocale,
	retrieveSingleProject,
	retrieveAllProjects,
	lockCurrentPage
});

export default rootReducer;
