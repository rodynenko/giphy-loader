import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/createStore';
import CoreLayout from 'layouts/CoreLayout';

const AppContainer = () => (
	<Provider store={store}>
		<CoreLayout />
	</Provider>
);

export default AppContainer;
