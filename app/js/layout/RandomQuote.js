import React from 'react';
import { Segment } from 'semantic-ui-react';

export default class RandomQuote extends React.Component{
	render(){
		return (
			<Segment>
				<h4>{'Big Artist Quote'}</h4>
				<h5>{'Big Artist name'}</h5>
			</Segment>
		);
	}
}