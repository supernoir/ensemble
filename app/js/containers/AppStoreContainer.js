import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => {
	return {
		locale    : state.switchLocale || 'en-US',
		messages  : state.Messenger,
		project   : state.retrieveSingleProject,
		projects  : state.retrieveAllProjects,
		character : state.retrieveSingleCharacter,
		characters: state.retrieveAllCharacters,
		loading   : state.lockCurrentPage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLocale         : locale => dispatch(locale),
		addMessage        : message => dispatch(message),
		getSingleProject  : project => dispatch(project),
		getAllProjects    : projects => dispatch(projects),
		getSingleCharacter: character => dispatch(character),
		getAllCharacters  : characters => dispatch(characters),
		loadCurrentPage   : loading => dispatch(loading)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
