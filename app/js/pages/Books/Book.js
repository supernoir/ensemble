import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';

export default class Book extends React.Component {
	constructor(){
		super();
		this.state = {
			book: [],
			cast: [],
		};
		this.getCharacter = this.getCharacter.bind(this);
	}

	componentDidMount(){
		axios.get(`http://localhost:3030/book/${this.props.match.params.id}`)
			.then(res => {
				if (res.data.book.cast !== void 0) {
					let rawCast = res.data.book.cast.split(',');
					rawCast.map(member => this.getCharacter(member));
				}
				this.setState({ book: res.data.book });
			}
			);
	}

	getCharacter(id) {
		return axios.get(`http://localhost:3030/character/${id}`)
			.then(res => {
				this.setState({
					cast: [
						...this.state.cast,
						res.data.character
					]
				});
			}
			);
	}

	render(){
		return(
			<div>
				<ol class="breadcrumb">
					<li><a href="#/">{intl.get('component.dashboard')}</a></li>
					<li class="active"><a href="/books">{intl.get('entity.books')}</a></li>
					<li class="active"><a href="/">{this.state.book.title}</a></li>
				</ol>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h2>{this.state.book.title}</h2>
						<h4>{this.state.book.series}</h4>
					</div>
					<div class="panel-body">
						<p class="text-muted">{this.state.book.desc}</p>
						<table class="table">
							<thead>
								<tr>
									<th>{intl.get('entity.characters')}</th>
								</tr>
							</thead>
							<tbody>
								{this.state.cast !== void 0 || this.state.cast.length > 0
									? this.state.cast.map(member => {
										return <tr>
											<td><Link to={`/character/${member._id}`}>{member.first_name} {member.last_name}</Link></td>
										</tr>;
									})
									: null
								}
							</tbody>
						</table>
						<hr/>
						<a>{intl.get('book.action-edit')}</a> {' | '} <a>{intl.get('book.action-delete')}</a>
					</div>
				</div>
			</div>
		);
	}
}