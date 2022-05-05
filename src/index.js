// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/scss/main.scss';
import '../assets/application.scss';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';
import init from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const start = async () => {
  const socket = io();
  const container = document.getElementById('root');
  const application = await init(socket);
  const root = createRoot(container);
  root.render(
    application,
  );
};

start();
export default start;

// eslint-disable-next-line react/jsx-filename-extension
