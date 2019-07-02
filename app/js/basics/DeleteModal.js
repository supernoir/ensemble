import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';

/**
 * DeleteModal Class
 * Asks the user to confirm the deletion of an item
 */
class DeleteModal extends React.Component {
	render() {
		return (
			<Modal open={this.props.open} onClose={() => this.props.close()}>
				<Modal.Header>{intl.get('modal.delete-title')}</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Header>{intl.get('modal.delete-content-header', { entity: this.props.entity, ref: this.props.item })}</Header>
						<p>{intl.get('modal.delete-content-body', { entity: this.props.entity })}</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={() => this.props.close()}>
						{intl.get('app.cancel')}
					</Button>
					<Button
						negative
						icon="checkmark"
						labelPosition="right"
						content={intl.get('modal.delete-button-delete')}
						onClick={() => {
							this.props.confirmDelete(this.props.item);
							this.props.close();
							this.props.history.push(this.props.target);
						}}
					/>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default withRouter(DeleteModal);