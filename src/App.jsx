import React, { useState, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  NotFound, Login, SignUp, Home,
} from 'pages';
import RequireAuth from 'components/RequireAuth';
import Header from 'components/Header';
import Modals from 'components/modals';
import { useTranslation } from 'react-i18next';

function App() {
  const [isNotFoundPage, setNotFoundPage] = useState(false);
  return (
    <Suspense fallback={<div>Загурзка...</div>}>
      <div className="d-flex flex-column h-100">
        {!isNotFoundPage && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound setNotFoundPage={setNotFoundPage} />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        </Routes>
        <Modals />
      </div>
    </Suspense>
  );
}

export default App;
