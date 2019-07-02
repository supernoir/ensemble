import React from 'react';

const LOCALES = ['en_US', 'es_ES'];

export default class LanguageSwitcher extends React.Component {
	render(){
		return (
			<select>
				{LOCALES.map(locale => {
					return <option>{locale}</option>;
				})}
			</select>
		);
	}
}