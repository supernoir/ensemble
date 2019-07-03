import React from 'react';

import { Dropdown, Flag, Menu } from 'semantic-ui-react';
import intl from 'react-intl-universal';
import LOCALES from '../constants/locales';
import { setLocale } from '../actions/setLocale';

export default class LanguageSwitcher extends React.Component {

	handleLocaleChange = (evt, locale) => {
		evt.preventDefault();
		console.log(this.props);
		this.props.setLocale(locale);
		//this.props.dispatch(setLocale(locale));
		//his.props.store.dispatch(setLocale(locale));



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