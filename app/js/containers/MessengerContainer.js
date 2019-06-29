import { connect } from 'react-redux';
import NotificationCenter from '../layout/NotificationCenter';

const mapStateToProps = state => {
	return {
		messages: state.Messenger,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addMessage: message => dispatch(message),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenter);
