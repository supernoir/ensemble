import React from 'react';
import axios from 'axios';

export default class NewBook extends React.Component {

	constructor(){
		super();
		this.state = {
			title : '',
			genre : '',
			series: '',
			cast  : '',
			desc  : ''
		};

		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(source, evt) {
  	switch(source) {
  		case 'title':
  			this.setState({ title: evt.currentTarget.value });
				break;
			case 'series':
  			this.setState({ series: evt.currentTarget.value });
  			break;
			case 'genre':
  			this.setState({ genre: evt.currentTarget.value });
  			break;
			case 'desc':
  			this.setState({ desc: evt.currentTarget.value });
				break;
			case 'cast':
  			this.setState({ cast: evt.currentTarget.value });
  			break;
  		default:
  			break;
  	}
  	console.log(source, evt.currentTarget.value);
	}

	componentDidMount(){
		console.log(this.props);
	}

	postNewBook(evt){
		evt.preventDefault();
		axios.post(
			'http://localhost:3030/book',
			{
				title     : this.state.title,
				genre    : this.state.genre,
				series: this.state.series,
				desc     : this.state.desc,
				cast     : this.state.cast,
			}
		).catch(err => console.log(err));
		this.props.history.push('/books');
	}

	render(){
  	return(
  		<div ng-controller="bookController">
  			<ol className="breadcrumb">
  				<li><a href="#/">Books</a></li>
  				<li className="active"><a href="#/add_book">Add Book</a></li>
  			</ol>

  			<div className="panel panel-default">
  				<div className="panel-heading">
  					<h2>Add Book</h2>
  				</div>
  				<div className="panel-body">
  					<form className="form-horizontal" name="book" ng-submit="submitBook()">
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label">Title</label>
  							<div className="col-sm-10">
  								<input onChange={(evt)=> this.handleInput('title',evt)} type="text" className="form-control" id="title" placeholder="The Final Problem" required/>
  							</div>
  						</div>
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label">Genre</label>
								<div className="col-sm-10">
									<input onChange={(evt)=> this.handleInput('genre',evt)} type="text" className="form-control" id="genre" placeholder="Crime, Suspense"/>
  							</div>
  						</div>
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label">Series</label>
								<div className="col-sm-10">
									<input onChange={(evt)=> this.handleInput('series',evt)} type="text" className="form-control" id="series" placeholder="The Memoirs of Sherlock Holmes"/>
  							</div>
  						</div>
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label">Cast</label>
  							<div className="col-sm-10">
									<input onChange={(evt)=> this.handleInput('cast',evt)} type="text" className="form-control" id="cast" placeholder="Sherlock Holmes, James Watson" />
  							</div>
  						</div>
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label"><code>Connect Characters</code></label>
  							<div className="col-sm-10">
  								<select className="form-control">
  									<option ng-repeat="character in characters">{'character.first_name'} {'character.last_name'}</option>
  								</select>
  							</div>
  						</div>
  						<div className="form-group">
  							<label for="book" className="col-sm-2 control-label">Description</label>
  							<div className="col-sm-10">
									<input onChange={(evt)=> this.handleInput('desc',evt)} type="text" className="form-control" id="desc" placeholder="The Adventures of Sherlock Holmes" required/>
  							</div>
  						</div>
  						<div className="form-group">
  							<div className="col-sm-offset-2 col-sm-10">
  								<button onClick={evt => this.postNewBook(evt)} type="submit" className="btn btn-default">Create Book</button>
  							</div>
  						</div>
  					</form>

  				</div>
  			</div>
  		</div>
  	);
	}
}