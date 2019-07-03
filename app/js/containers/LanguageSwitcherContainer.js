import { connect } from 'react-redux';
import LanguageSwitcher from '../basics/LanguageSwitcher';

const mapStateToProps = state => {
	return {
		locale: state.switchLocale
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setLocale: locale => dispatch(locale)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
