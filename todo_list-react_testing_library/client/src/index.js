import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import todos from './sample.js';

render(<App todos={todos} />, document.getElementById('app'))