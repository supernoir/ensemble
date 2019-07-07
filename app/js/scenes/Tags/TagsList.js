import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Divider, Label } from 'semantic-ui-react';
import Loader from '../../basics/Loader';

export default class TagsList extends React.Component {

	componentDidMount() {
		this.props.getTags();
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				<Breadcrumb>
					<Breadcrumb.Section link>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						<Link to="/projects">{intl.get('entity.tags')}</Link>
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{intl.get('entity.tags')}
						<Header.Subheader>{intl.get('desc.tags')}</Header.Subheader>
					</Header>
				</Segment>

				<Divider />

				<Segment>
					<Label.Group tag>
						{this.props.tags !== void 0
							? this.props.tags.map((tag, index) => {
								return <Label key={`${tag}-${index}`} size="large">{tag.name}</Label>;
							})
							: null}
					</Label.Group>
				</Segment>
			</Container>;
	}
}
