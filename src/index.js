// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/scss/main.scss';
import '../assets/application.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { store } from 'store/index';
import SocketProvider from 'context/SocketContext';
import { Provider as RollBarProvider, ErrorBoundary, LEVEL_INFO } from '@rollbar/react';
import App from './App';

const socket = io();
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const container = document.getElementById('chat');
const root = createRoot(container);

// eslint-disable-next-line react/jsx-filename-extension
root.render(
  <BrowserRouter>
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_INFO}>
        <Provider store={store}>
          <SocketProvider socket={socket}><App /></SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollBarProvider>
  </BrowserRouter>,
);
