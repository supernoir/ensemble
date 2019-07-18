import React from 'react';
import ReactDOM from 'react-dom';

// Import Styles
import '../public/styles/main.scss';

// Initialize service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js');
	//.then(console.log('SW registered'))
	//.catch(console.error('An error occurred while registering the SW'));
}

import { Container } from 'semantic-ui-react';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import AppStoreContainer from './containers/AppStoreContainer';

const composedEnhancers = compose(...[applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]);

const store = createStore(rootReducer, composedEnhancers);

/**
 * Class Ensemble
 * Root component
 */
export default class Ensemble extends React.Component {
	render() {
		return (
			<Container>
				<Provider store={store}>
					<AppStoreContainer />
				</Provider>
			</Container>
		);
	}
}

ReactDOM.render(<Ensemble />, document.getElementById('app'));
