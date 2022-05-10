import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Home, Login, NotFound, SignUp,
} from './pages';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import Modals from './components/modals';

function App() {
  const [isNotFoundPage, setNotFoundPage] = useState(false);
  return (
    <div className="d-flex flex-column h-100">
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route
          path="/"
          element={(
            <RequireAuth>
              <Home />
            </RequireAuth>
            )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound setNotFoundPage={setNotFoundPage} />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modals />
    </div>

  );
}

export default App;
