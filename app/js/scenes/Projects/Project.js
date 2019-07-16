import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Table, Divider, Button, Icon, Label } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';

/**
 * Class Project
 * Single Project view
 */
export default class Project extends React.Component {
	componentDidMount() {
		this.props.getProjectById(this.props.match.params.id);
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				<Breadcrumb>
					<Breadcrumb.Section>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section>
						<Link to="/projects">{intl.get('entity.projects')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{this.props.project.title}
					</Breadcrumb.Section>
				</Breadcrumb>

				<Segment>
					<Header as="h2">
						{this.props.project.title}
						<Header.Subheader>{this.props.project.series}</Header.Subheader>
					</Header>
					<Divider />

					<p>
						<Icon name="info circle" />{this.props.project.desc}
					</p>

					{this.props.project.tags !== void 0
						? <Label.Group tag>
							{this.props.project.tags.map((tag, index) => {
								return <Label key={`${tag}-${index}`}>{tag}</Label>;
							})}
						</Label.Group>
						: null}
					<Divider />

					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan="3">{intl.get('entity.characters')}</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body />
					</Table>
					<Divider />
					<Button>
						<Link to={`/editproject/${this.props.project._id}`}>{intl.get('project.action-edit')}</Link>
					</Button>
					<Button>
						{intl.get('project.action-delete')}
					</Button>
				</Segment>

			</Container>;
	}
}

Project.propTypes = {
	loading       : PropTypes.bool,
	getProjectById: PropTypes.func,
	match         : PropTypes.object,
	project       : PropTypes.shape({
		_id   : PropTypes.string,
		tags  : PropTypes.array,
		title : PropTypes.string,
		series: PropTypes.string,
		desc  : PropTypes.string
	})
};