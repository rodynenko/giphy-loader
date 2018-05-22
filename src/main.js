import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import 'normalize.css';
import App from './containers/AppContainer';

render(<App />, document.getElementById('app'));
