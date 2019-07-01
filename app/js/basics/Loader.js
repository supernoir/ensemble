import React from 'react';
import intl from 'react-intl-universal';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

export default class Loader extends React.Component {
	render(){
		return (
			<Dimmer active>
				<SemanticLoader inverted size='big'>{intl.get('app.loading')}</SemanticLoader>
			</Dimmer>
		);
	}
}