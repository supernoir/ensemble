import React from 'react';
import ReactDOM from 'react-dom';

// Import Styles
import '../public/styles/main.scss';

// Initialize service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then(console.log('SW registered'))
		.catch(console.error('An error occurred while registering the SW'));
}

import App from './App';
import { Container } from 'semantic-ui-react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class Ensemble extends React.Component {

	render() {
		return (
			<Container>
				<Provider store={store}>
					<App store={store}/>
				</Provider>
			</Container>
		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));
