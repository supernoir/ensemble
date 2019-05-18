import React from 'react';
import axios from 'axios';
import intl from 'react-intl-universal';

export default class NewCharacter extends React.Component {
	constructor() {
		super();
		this.state = {
			firstname: '',
			lastname : '',
			birthday : '',
			desc     : '',
			gender   : '',
			origin   : '',
			family   : '',
			book     : '',
			series   : '',
			imgurl   : ''
		};

		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(source, evt) {
		switch (source) {
			case 'firstname':
				this.setState({ firstname: evt.currentTarget.value });
				break;
			case 'lastname':
				this.setState({ lastname: evt.currentTarget.value });
				break;
			case 'gender':
				this.setState({ gender: evt.currentTarget.value });
				break;
			case 'birthday':
				this.setState({ age: evt.currentTarget.value });
				break;
			default:
				break;
		}
	}

	postnewCharacter(evt) {
		evt.preventDefault();
		axios
			.post('http://localhost:3030/character', {
				first_name: this.state.firstname,
				last_name : this.state.lastname,
				gender    : this.state.gender,
				birthday  : this.state.age,
				cast      : this.state.cast
			})
			.catch(err => console.log(err));
		this.props.history.push('/characters');
	}

	render() {
		return (
			<div>
				<ol className="breadcrumb">
					<li><a href="/">{intl.get('entity.characters')}</a></li>
					<li className="active"><a href="/add_character">{intl.get('character.action-add')}</a></li>
				</ol>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h2>{intl.get('character.action-add')}</h2>
					</div>
					<div className="panel-body">
						<form className="form-horizontal" name="book" ng-submit="submitBook()">
							<div className="form-group">
								<label for="book" className="col-sm-2 control-label">I18N First Name</label>
								<div className="col-sm-10">
									<input onChange={evt => this.handleInput('firstname', evt)} type="text" className="form-control" id="firstname" placeholder="Jane" required />
								</div>
							</div>
							<div className="form-group">
								<label for="book" className="col-sm-2 control-label">I18N Last Name</label>
								<div className="col-sm-10">
									<input onChange={evt => this.handleInput('lastname', evt)} type="text" className="form-control" id="lastname" placeholder="Doe" />
								</div>
							</div>
							<div className="form-group">
								<label for="book" className="col-sm-2 control-label">I18N Gender</label>
								<div className="col-sm-10">
									<input onChange={evt => this.handleInput('gender', evt)} type="text" className="form-control" id="gender" placeholder="Female" />
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10">
									<button onClick={evt => this.postnewCharacter(evt)} type="submit" className="btn btn-default">{intl.get('character.action-add')}</button>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
		);
	}
}
