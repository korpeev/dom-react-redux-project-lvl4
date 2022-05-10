import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import storage from '../utils/storage.js';
import { getAppState } from '../selectors/index.js';
import { reset } from '../store/slices/app.js';

export default function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getAppState);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onSignOut = () => {
    storage.clear();
    dispatch(reset());
    navigate('/login');
  };
  return (
    <Navbar className="w-100 navbar-expand " expand bg="primary">
      <Container>
        <Navbar.Text as={Link} to="/" className="text-white text-decoration-none">
          {t('main.title')}
        </Navbar.Text>
        <Navbar.Brand className="justify-content-end">
          {isAuth && <Button onClick={onSignOut} variant="light">{t('form.signOut')}</Button>}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
