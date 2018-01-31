import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducer';
import App from './app.js';

const store = createStore(
  reducer,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
