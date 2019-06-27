import { connect } from 'react-redux';
import Ensemble from '../index';

const mapStateToProps = state => {
	return {
		message: state.Messenger,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addMessage: message => dispatch(message),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Ensemble);
