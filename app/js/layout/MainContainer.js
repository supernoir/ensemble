import React from 'react';

export default class MainContainer extends React.Component {

	constructor(){
		super();
		this.state = {
			loading: false
		};
	}

	componentWillMount () {
		this.setState({
			loading: true
		});
	}
	componentDidMount () {
		this.setState({
			loading: false
		});
	}

	render(){
		return this.state.loading
			? <main>{'Loading...'}</main>
			: <main>{this.props.children}</main>;
	}
}