// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/scss/main.scss'
import '../assets/application.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { store } from './store/index.js';
import App from './App.jsx';
import SocketProvider from './context/SocketContext.jsx';
import { I18nextProvider } from 'react-i18next'
import i18next from 'services/i18n'

const socket = io();
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.getElementById('chat');
const root = createRoot(container);

// eslint-disable-next-line react/jsx-filename-extension
root.render(<BrowserRouter>
  <Provider store={store}>

    <SocketProvider socket={socket}><App /></SocketProvider>
  </Provider>
</BrowserRouter>);
