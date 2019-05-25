import React from 'react';
import intl from 'react-intl-universal';
import { Container, Segment, Header, Divider, Card, Feed } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
	render(){
		return(
			<Container>
				<Segment>
					<Header>
						{intl.get('component.dashboard')}
					</Header>
					<Divider/>
					<Card.Group>
						<Card
							href='/books'
							image={'../../public/img/photo-1443188631128-a1b6b1c5c207.jpeg'}
							header={intl.get('entity.books')}
							meta={`12 Books available`}
						/>
						<Card
							href='/characters'
							image={'../../public/img/photo-1427805371062-cacdd21273f1.jpeg'}
							header={intl.get('entity.characters')}
							meta={`4 Characters available`}
						/>
					</Card.Group>
					<Header>
						{'I18N: Recent Activity'}
						<Divider/>
						<Feed>
							<Feed.Event>
								<Feed.Label image={'../../public/img/protouser.png'} />
								<Feed.Content>
									<Feed.Date>{'I18N: 3 days ago'}</Feed.Date>
									<Feed.Summary>
										I18N: You added <a>The Passersby</a> to your books.
									</Feed.Summary>
								</Feed.Content>
							</Feed.Event>
						</Feed>
					</Header>
				</Segment>
			</Container>
		);
	}
}