import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducers from './reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk, apiMiddleware];

if (__DEV__) {
	const devToolsExtension = window.devToolsExtension;

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
);

const store = createStore(
	rootReducers,
	initialState,
	composedEnhancers
);

export default store;
