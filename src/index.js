import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/index.css';
import './Assets/Estilos.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './Includes/Bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
