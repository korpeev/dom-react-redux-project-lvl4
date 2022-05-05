import { ErrorBoundary, LEVEL_INFO, Provider as RollBarProvider } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from './store/index';
import SocketProvider from './context/SocketContext';
import App from './App';
import resources from './locales/ru.json';

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

const init = async (socket) => (
  <RollBarProvider config={rollbarConfig}>
    <ErrorBoundary level={LEVEL_INFO}>
      <BrowserRouter>
        <Provider store={store}>
          <SocketProvider socket={socket}><App /></SocketProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </RollBarProvider>
);

export default init;
