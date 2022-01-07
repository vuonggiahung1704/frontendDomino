import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import NotificationProvider from './components/Notifications/NotificationProvider';

ReactDOM.render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>,
  document.getElementById('root')
);
