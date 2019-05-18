import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

export default class Character extends React.Component {
	constructor(){
		super();
		this.state = {
			character: []
		};
	}
	componentDidMount(){
		axios.get(`http://localhost:3030/character/${this.props.match.params.id}`)
			.then(res => {
				this.setState({ character: res.data.character });
			}
			);
	}

	render(){
		return(
			<div>
				<ol class="breadcrumb">
					<li><a href="#/">{intl.get('component.dashboard')}</a></li>
					<li class="active"><a href="/characters">{intl.get('entity.characters')}</a></li>
					<li class="active"><a href="/">{this.state.character.first_name} {this.state.character.last_name}</a></li>
				</ol>

				<div class="panel panel-default">
					<div class="panel-heading">
						<h2>{this.state.character.first_name} <b>{this.state.character.last_name}</b></h2>
						<h4>{this.state.character.gender} <span className="text-muted">{this.state.character.age}</span></h4>
					</div>
					<div class="panel-body">
						<p class="text-muted">{this.state.character.desc}</p>
						<hr/>
						<a>{intl.get('character.action-edit')}</a> {' | '} <a>{intl.get('character.action-delete')}</a>
					</div>
				</div>
			</div>
		);
	}
}