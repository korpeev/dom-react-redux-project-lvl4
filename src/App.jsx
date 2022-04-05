import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Login } from './pages/Login';
import NotFound from './pages/404Page/NotFound.jsx';
import AppProvider from './context/AppContext.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Header from './components/Header.jsx';

function App() {
  const [isNotFoundPage, setNotFoundPage] = useState(false);
  return (
    <AppProvider>
      <div className="d-flex flex-column justify-content-around h-100">
        {!isNotFoundPage && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound setNotFoundPage={setNotFoundPage} />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
