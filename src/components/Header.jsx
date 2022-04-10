import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../utils/storage.js';
import { getAppState } from '../selectors/index.js';
import { reset } from '../store/slices/app.js';

export default function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getAppState);
  const navigate = useNavigate();
  const onSignOut = () => {
    storage.clear();
    dispatch(reset());
    navigate('/login');
  };
  return (
    <Navbar className="w-100 navbar-expand " expand bg="primary">
      <Container>
        <Navbar.Text className="text-white">
          React Chat
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          {isAuth && <Button onClick={onSignOut} variant="light">Sign Out</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
