import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';

export default class Books extends React.Component {
	constructor(){
		super();
		this.state = {
			books: []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:3030/books')
			.then(res => {
				this.setState({ books: res.data });
			}
			);
	}

	render(){
		return(
			<div>
				<ol class="breadcrumb">
					<li><Link to="/">{intl.get('component.dashboard')}</Link></li>
					<li class="active"><Link to="/books">{intl.get('entity.books')}</Link></li>
				</ol>

				<div class="jumbotron jumbo-books">
					<h1>{intl.get('entity.books')}</h1>
					<Link to="/addbook"><button type="submit" class="btn btn-default">{intl.get('book.action-add')}</button></Link>
				</div>

				{this.state.books.map(book => {
					return (
						<div class="panel panel-default">
							<div class="panel-heading">
								<Link to={`/book/${book._id}`}><h2>{book.title}</h2></Link>
								{book.series !== void 0
									? <h4>
										<b>{intl.get('entity.books.series')}</b>{' '}<Link to='/books/series/id'>{book.series}</Link>
									</h4>
									: null
								}
							</div>
							<div class="panel-body">
								<p class="text-muted">{book.desc}</p>
								<hr/>
								<a>{intl.get('book.action-edit')}</a> {' | '} <a>{intl.get('book.action-delete')}</a>
							</div>
						</div>
					);
				})}

			</div>
		);
	}
}