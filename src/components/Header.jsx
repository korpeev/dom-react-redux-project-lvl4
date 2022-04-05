import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage.js';
import { useAppContext } from '../context/AppContext.jsx';

export default function Header() {
  const { isLoggedIn, setLoggedIn, setError } = useAppContext();
  const navigate = useNavigate();
  const onSignOut = () => {
    storage.clear();
    setLoggedIn(false);
    setError({ message: '', active: false });
    navigate('/login');
  };
  return (
    <Navbar className="w-100 position-absolute top-0 " style={{ left: 0 }} bg="primary">
      <Container>
        <Navbar.Text className="text-white">
          React Chat
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn && <Button onClick={onSignOut} variant="light">Sign Out</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
