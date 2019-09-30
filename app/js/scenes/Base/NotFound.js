import React from 'react';
import { Container, Segment, Header, Icon, Button } from 'semantic-ui-react';

/**
 * Class NotFound
 * To be displayed if a route cannot be associated with a component
 */
export default class NotFound extends React.Component {
	render(){
		return (
			<Container>
				<Segment placeholder>
					<Header icon>
						<Icon name='warning sign' />
						{'We cannot find what you\'re looking for'}
					</Header>
					<Segment.Inline>
						<Button primary href='/'>Dashboard</Button>
					</Segment.Inline>
				</Segment>
			</Container>
		);
	}
}