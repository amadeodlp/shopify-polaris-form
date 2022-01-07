import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider} from '@shopify/polaris';
import { Provider } from 'react-redux';
import store from './State/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App/>
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
