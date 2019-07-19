import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => {
	return {
		locale  : state.switchLocale || 'en-US',
		messages: state.Messenger,
		project : state.retrieveSingleProject,
		projects: state.retrieveAllProjects,
		loading : state.lockCurrentPage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLocale      : locale => dispatch(locale),
		addMessage     : message => dispatch(message),
		getProjectById : project => dispatch(project),
		getAllProjects : projects => dispatch(projects),
		loadCurrentPage: loading => dispatch(loading)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
