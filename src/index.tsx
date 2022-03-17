import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// @ts-ignore
import { setupStore } from './redux/store.ts';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

const store = setupStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
