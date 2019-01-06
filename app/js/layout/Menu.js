import React from 'react';

export default class Menu extends React.Component {
	render(){
		return (
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="/">Imaginary Friends</a>
					</div>

					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li><a href="/books"><span class="glyphicon glyphicon-book"></span> Books</a></li>
							<li><a href="/"><span class="glyphicon glyphicon-user"></span> Ensemble</a></li>
							<li><a href="/travelogue"><span class="glyphicon glyphicon-globe"></span> Travelogue</a></li>
							<li><a href="/timeline"><span class="glyphicon glyphicon-calendar"></span> Timeline</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}