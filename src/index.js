import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Control from './Control';
import * as serviceWorker from './serviceWorker';

/**
 * Renders root element webpage.
 */

ReactDOM.render(<Control />, document.getElementById('root'));

serviceWorker.unregister();
