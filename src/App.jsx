import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';
import NotFound from './pages/404Page/NotFound.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Modals from './components/modals/index.jsx';

function App() {
  const [isNotFoundPage, setNotFoundPage] = useState(false);
  return (
    <div className="d-flex flex-column h-100">
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound setNotFoundPage={setNotFoundPage} />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      </Routes>
      <Modals />
    </div>
  );
}

export default App;
