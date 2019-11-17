import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Presenter from './Presenter';
import * as serviceWorker from './serviceWorker';

/**
 * Renders root element webpage.
 */

ReactDOM.render(<Presenter />, document.getElementById('root'));

serviceWorker.unregister();
