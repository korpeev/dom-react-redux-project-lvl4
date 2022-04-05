// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.getElementById('chat');
const root = createRoot(container);

// eslint-disable-next-line react/jsx-filename-extension
root.render(<BrowserRouter><App /></BrowserRouter>);
