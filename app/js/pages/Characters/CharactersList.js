import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CharactersList extends React.Component {
	constructor(){
		super();
		this.state = {
			characters: []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:3030/characters')
			.then(res => {
				this.setState({ characters: res.data });
			}
			);
	}

	render(){
		return(
			<div>
				<ol class="breadcrumb">
					<li><Link to="/">Home</Link></li>
					<li class="active"><Link to="/characters">Characters</Link></li>
				</ol>

				<div class="jumbotron jumbo-characters">
					<h1>Characters</h1>
					<Link to="/addcharacter"><button type="submit" class="btn btn-default">Add Character</button></Link>
				</div>

				{this.state.characters.map(character => {
					return (
						<div class="panel panel-default">
							<div class="panel-heading">
								<Link to={`/character/${character._id}`}><h2>{character.first_name} <b>{character.last_name}</b></h2></Link>
								<h4>{character.gender} <span className="text-muted">{character.age}</span></h4>
							</div>
							<div class="panel-body">
								<ul>
									{character.series !== void 0
										? <li>
												  <b>Series:</b> <a href="/:cast">{character.series}</a>
											  </li>
										: null
									}
									{character.book !== void 0
										? <li>
												  <b>Book:</b> <a href="/:cast">{character.book}</a>
											  </li>
										: null
									}
									{character.family !== void 0
										? <li>
												  <b>Family:</b> <a href="/:cast">{character.family}</a>
											  </li>
										: null
									}
								</ul>
								<hr/>
								<a>{'Edit'}</a> {' | '} <a>{'Delete'}</a>
							</div>
						</div>
					);
				})}

			</div>
		);
	}
}