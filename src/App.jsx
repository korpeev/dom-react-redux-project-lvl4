import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  NotFound, Login, SignUp, Home,
} from 'pages';
import RequireAuth from 'components/RequireAuth';
import Header from 'components/Header';
import Modals from 'components/modals';

function App() {
  const [isNotFoundPage, setNotFoundPage] = useState(false);
  return (
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
  );
}

export default App;
