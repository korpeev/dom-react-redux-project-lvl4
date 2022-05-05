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
import { Provider as RollBarProvider, ErrorBoundary, LEVEL_INFO } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import SocketProvider from './context/SocketContext';
import { store } from './store/index';
import App from './App';
import resources from './locales/ru.json';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const socket = io();
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


 const start = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
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
  }
}

start()
export default start

// eslint-disable-next-line react/jsx-filename-extension

