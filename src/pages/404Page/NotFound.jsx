import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound({ setNotFoundPage }) {
  useEffect(() => {
    setNotFoundPage(true);
    return () => {
      setNotFoundPage(false);
    };
  }, []);
  return (
    <div className="w-100 h-100 text-center">
      <h1>Страница не найдено</h1>
      <Link to="/">Вернуться назад</Link>
    </div>
  );
}

export default NotFound;
