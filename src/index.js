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
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';
import resources from './locales/ru.json';

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

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  debug: process.env.NODE_ENV === 'development',
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

const container = document.getElementById('chat');
const root = createRoot(container);

// eslint-disable-next-line react/jsx-filename-extension
root.render(
  <RollBarProvider config={rollbarConfig}>
    <ErrorBoundary level={LEVEL_INFO}>
      <BrowserRouter>
        <Provider store={store}>
          <SocketProvider socket={socket}><App /></SocketProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </RollBarProvider>,
);
