import { combineReducers } from 'redux';
import Messenger from './Messenger';
import switchLocale from './switchLocale';

// Import Project Reducers
import retrieveSingleProject from './retrieveSingleProject';
import retrieveAllProjects from './retrieveAllProjects';

// Import Loading Reducers
import lockCurrentPage from './lockCurrentPage';

// Import Character Reducers
import retrieveSingleCharacter from './retrieveSingleCharacter';
import retrieveAllCharacters from './retrieveAllCharacters';

export const rootReducer = combineReducers({
	Messenger,
	switchLocale,
	retrieveSingleProject,
	retrieveAllProjects,
	retrieveSingleCharacter,
	retrieveAllCharacters,
	lockCurrentPage
});

export default rootReducer;
