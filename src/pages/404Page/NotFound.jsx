import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="w-100 h-100 text-center">
      <h1>Страница не найдено</h1>
      <Link to="/">Вернуться назад</Link>
    </div>
  );
}

export default NotFound;
