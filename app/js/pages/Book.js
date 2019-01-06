import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
	constructor(){
		super();
		this.state = {
			book: []
		};
	}
	componentDidMount(){
		axios.get(`http://localhost:3030/book/${this.props.match.params.id}`)
			.then(res => {
				this.setState({ book: res.data.book });
				console.log(res.data.book);
			}
			);
	}

	render(){
		return(
			<div>
				<ol class="breadcrumb">
					<li><a href="#/">Home</a></li>
					<li class="active"><a href="#/">Books</a></li>
					<li class="active"><a href="#/">{this.state.book.title}</a></li>
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
									<th>id</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><a href="/:cast">{this.state.book.cast}</a></td>
									<td><code>{'their id'}</code></td>
								</tr>
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