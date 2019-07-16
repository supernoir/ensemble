import React from 'react';
import intl from 'react-intl-universal';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

/**
 * Class Loader
 * component to be shown when a parent is loading
 */
export default class Loader extends React.Component {
	render(){
		return (
			<Dimmer active>
				<SemanticLoader inverted size='big'>{intl.get('app.loading')}</SemanticLoader>
			</Dimmer>
		);
	}
}