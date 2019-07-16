import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Container, Breadcrumb, Segment, Header, Table, Divider, Button, Icon, Label, SegmentGroup } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import PropTypes from 'prop-types';
import { projectStatus, projectStatusColormapping } from '../../constants/projectStatus';

/**
 * Class Project
 * Single Project view
 */
export default class Project extends React.Component {
	componentDidMount() {
		this.props.getProjectById(this.props.match.params.id);
	}

getStatusColorMapping = (status) => {
	switch(status) {
		case projectStatus.IN_PROGRESS:
			return projectStatusColormapping.inprogress;
		case projectStatus.IN_REVIEW:
			return projectStatusColormapping.inreview;
		case projectStatus.EDITING:
			return projectStatusColormapping.editing;
		case projectStatus.PUBLISHED:
			return projectStatusColormapping.published;
		default:
			return projectStatusColormapping.draft;
	}
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

			<SegmentGroup>
				<Segment>
					<Header as="h2">
						{this.props.project.title}
					</Header>
				</Segment>

				<SegmentGroup horizontal>

					{this.props.project.type !== void 0
						? <Segment>
							<Header as="h4">{intl.get('project.label-type')}</Header>
							<Label
								color={'black'}
								size={'large'}
								content={intl.get(this.props.project.type !== void 0
									? `project.select-type-${this.props.project.type}`
									: 'project.select-type-novel'
								)}
								icon={'compass'}
							/>

						</Segment>
						: null
					}

					{this.props.project.status !== void 0
						? <Segment>
							<Header as="h4">{intl.get('project.label-status')}</Header>
							<Label
								color={this.getStatusColorMapping(this.props.project.status)}
								size={'large'}
								content={intl.get(`project.status-${this.props.project.status}`
										|| 'project.status-inprogress')}
								icon='thumbtack' />
						</Segment>
						: null
					}
					{this.props.project.series !== void 0 && this.props.project.series.length > 0
						? <Segment>
							<Header as="h4">{intl.get('project.label-series')}</Header>
							<Label
								size={'large'}
								content={this.props.project.series}
								icon='paperclip' />
						</Segment>
						: null
					}
				</SegmentGroup>

				{
					this.props.project.desc !== void 0
						? <Segment>
							<Header as="h4">{intl.get('project.label-description')}</Header>
							<p>{this.props.project.desc}</p>
						</Segment>
						: null
				}

				{
					this.props.project.genre !== void 0
						?	<Segment>
							<Header as="h4">{intl.get('project.label-genres')}</Header>
							{this.props.project.genre.map((genre, index) => {
								return <Label key={`${genre}-${index}`}>{genre}</Label>;
							})}
						</Segment>
						: null
				}


				{
					this.props.project.cast !== void 0
						? <Segment>
							<Header as="h4">{intl.get('project.label-cast')}</Header>
							<Table celled striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>{intl.get('entity.characters')}</Table.HeaderCell>
										<Table.HeaderCell>{'I18N Circles'}</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{this.props.project.cast.map((member, index) => {
										return <Table.Row key={`${member}-${index}`}>
											<Table.Cell>
												{member}
											</Table.Cell>
											<Table.Cell>
												{'-'}
											</Table.Cell>
										</Table.Row>;
									})}
								</Table.Body>
							</Table>
						</Segment>
						: null
				}

				{
					this.props.project.tags !== void 0 && this.props.project.tags.length > 0
						?	<Segment>
							<Header as="h4">{intl.get('project.label-tags')}</Header>
							<Label.Group tag>
								{this.props.project.tags.map((tag, index) => {
									return <Label key={`${tag}-${index}`}>{tag}</Label>;
								})}
							</Label.Group>
						</Segment>
						: null
				}

				<Segment>
					<Button>
						<Link to={`/editproject/${this.props.project._id}`}>{intl.get('project.action-edit')}</Link>
					</Button>
					<Button>
						{intl.get('project.action-delete')}
					</Button>
				</Segment>

			</SegmentGroup>

		</Container>;
}
}

Project.propTypes = {
	loading       : PropTypes.bool,
	getProjectById: PropTypes.func,
	match         : PropTypes.object,
	project       : PropTypes.shape({
		_id          : PropTypes.string,
		type         : PropTypes.string,
		title        : PropTypes.string,
		status       : PropTypes.string,
		authors       : PropTypes.array,
		collaborators: PropTypes.array,
		series       : PropTypes.string,
		cast         : PropTypes.array,
		desc         : PropTypes.string,
		genres        : PropTypes.array,
		tags         : PropTypes.array,
		content      : PropTypes.array
	})
};
