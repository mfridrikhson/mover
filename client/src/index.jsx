import React from 'react';
import ReactDOM from 'react-dom';
import App from './scenes/App';

import './styles/reset.scss';
import './styles/common.scss';
import 'semantic-ui-css/semantic.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
