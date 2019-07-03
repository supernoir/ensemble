import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = state => {
	return {
		locale  : state.switchLocale || 'en-US',
		messages: state.Messenger
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLocale : locale => dispatch(locale),
		addMessage: message => dispatch(message)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
