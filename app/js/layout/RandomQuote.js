import React from 'react';
import { Segment } from 'semantic-ui-react';

const testQuotes = [
	{
		quote : 'Every writer hopes or boldly assumes that his life is in some sense exemplary, that the particular will turn out to be universal.',
		author: 'Martin Amis'
	},
	{
		quote : 'Any writer, I suppose, feels that the world into which he was born is nothing less than a conspiracy against the cultivation of his talent.',
		author: 'James Baldwin'
	},
	{
		quote : 'These two rules make the best system: first, have something to say; second, say it.',
		author: 'Nathanael Emmons'
	},
	{
		quote : 'L\'écrivain original n\'est pas celui qui n\'imite personne, mais celui que personne ne peut imiter.',
		author: 'François-René de Chateaubriand'
	}
];

export default class RandomQuote extends React.Component {
	constructor() {
		super();
		this.randIntRef = React.createRef();
	}
	getRandomNumber = set => {
		return Math.floor(Math.random() * (set - 1)) + 1;
	};

	componentDidMount() {
		this.randIntRef.current = this.getRandomNumber(testQuotes.length);
	}

	render() {
		return (
			<Segment>
				<h4>{testQuotes[this.randIntRef.current || 0].quote}</h4>
				<h5>{testQuotes[this.randIntRef.current || 0].author}</h5>
			</Segment>
		);
	}
}
