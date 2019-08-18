import React from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Segment, SegmentGroup, Header, Button, Label } from 'semantic-ui-react';
import Loader from '../../basics/Loader';
import DeleteModal from './../../basics/DeleteModal';

/**
 * Class Character
 * Single Character View
 */
export default class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			showDeleteModal: false,
			projectId      : ''
		};
	}

	componentDidMount() {
		this.props.getCharacterById(this.props.match.params.id);
	}

	/**
	 * toggleDeleteModal method
	 * toggles showing/hiding the modal
	 */
	toggleDeleteModal = id => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal,
			projectId      : id
		});
	}

	render() {
		return this.props.loading
			? <Loader loading={this.props.loading} />
			: <Container>
				{this.state.showDeleteModal
					? <DeleteModal
						open={this.state.showDeleteModal}
						close={this.toggleDeleteModal}
						entity={intl.get('entity.character')}
						ref={'testCharacter'}
						target={'/characters'}
						item={this.props.character._id}
						confirmDelete={id => this.props.deleteSpecificCharacter(id)}
					/>
					: null}
				<Breadcrumb>
					<Breadcrumb.Section>
						<Link to="/">{intl.get('component.dashboard')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section>
						<Link to="/characters">{intl.get('entity.characters')}</Link>
					</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>
						{this.props.character.full_name}
					</Breadcrumb.Section>
				</Breadcrumb>

				<SegmentGroup>
					<Segment>
						<Header as="h2">
							{this.props.character.full_name}
						</Header>
					</Segment>

					<SegmentGroup horizontal>

						{this.props.character.gender !== void 0
							? <Segment>
								<Header as="h4">{intl.get('character.label-gender')}</Header>
								<Label size={'large'} content={this.props.character.gender} icon={'transgender'} />

							</Segment>
							: null}

						{this.props.character.birthday !== void 0 && this.props.character.birthday.length > 0
							? <Segment>
								<Header as="h4">{intl.get('character.label-birthday')}</Header>
								<Label size={'large'} content={this.props.character.birthday} icon="birthday cake" />
							</Segment>
							: null}
					</SegmentGroup>

					{this.props.character.desc !== void 0
						? <Segment>
							<Header as="h4">{intl.get('character.label-desc')}</Header>
							<p>{this.props.character.desc}</p>
						</Segment>
						: null}

					{this.props.character.origin !== void 0
						? <Segment>
							<Header as="h4">{intl.get('character.label-origin')}</Header>
							<p>{this.props.character.origin}</p>
						</Segment>
						: null}

					{this.props.character.projects !== void 0
						? <Segment>
							<Header as="h4">{intl.get('entity.projects')}</Header>
							{this.props.character.projects.map((project, index) => {
								return <Label key={`${project}-${index}`} size={'large'} content={project} icon={'book'} />;
							})}
						</Segment>
						: null}

					<Segment>
						<Link to={`/editcharacter/${this.props.character._id}`}>
							<Button>
								{intl.get('character.action-edit')}
							</Button>
						</Link>
						<Button onClick={() => this.toggleDeleteModal(this.props.character._id)} content={intl.get('character.action-delete')} />
					</Segment>

				</SegmentGroup>

			</Container>;
	}
}

Character.propTypes = {
	loading         : PropTypes.bool,
	match           : PropTypes.object,
	getCharacterById: PropTypes.func,
	character       : PropTypes.shape({
		first_name : PropTypes.string,
		last_name  : PropTypes.string,
		gender     : PropTypes.string,
		birthday   : PropTypes.string,
		origin     : PropTypes.string,
		nationality: PropTypes.string,
		desc       : PropTypes.string
	})
};
