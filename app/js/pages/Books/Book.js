import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
				let rawCast = res.data.book.cast.split(',');
				rawCast.map(member => this.getCharacter(member));
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
					<li><a href="#/">Home</a></li>
					<li class="active"><a href="/books">Books</a></li>
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
									<th>Characters</th>
								</tr>
							</thead>
							<tbody>
								{this.state.cast.length > 0
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
						<a>{'Edit'}</a> {' | '} <a>{'Delete'}</a>
					</div>
				</div>
			</div>
		);
	}
}