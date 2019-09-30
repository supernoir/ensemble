import React from 'react';
import { Dropdown, Flag } from 'semantic-ui-react';
import intl from 'react-intl-universal';
import LOCALES from '../constants/locales';
import PropTypes from 'prop-types';

/**
 * Class LanguageSwitcher
 * handles the switching of languages
 */
export default class LanguageSwitcher extends React.Component {

	handleLocaleChange = (evt, locale) => {
		evt.preventDefault();
		this.props.setCurrentLocale(locale);
	}

	render(){
		return (
			<Dropdown item icon="globe">
				<Dropdown.Menu>
					{
						LOCALES.map((entry, index) => {
							return <Dropdown.Item
								key={entry.locale + '-' + index}
								value={entry.locale}
								onClick={(evt)=>this.handleLocaleChange(evt, entry.locale)}
							>
								<Flag name={entry.code} />{intl.get(entry.name)}
							</Dropdown.Item>;
						})
					}
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

LanguageSwitcher.propTypes = {
	setCurrentLocale: PropTypes.func
};