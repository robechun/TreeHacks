import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/style.css';
import App from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import { configure } from 'radiks';

configure({
  apiServer: 'http://localhost:1260'
});

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
