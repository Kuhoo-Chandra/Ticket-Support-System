import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AuthModal({ handleClose, isLoginModalOpen }) {
  const [login, setLogin] = useState(true); // true for login, false for register

  const switchForm = () => {
    setLogin(!login);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    // For simplicity, just switching between login and register
    switchForm();

    // Check if it's a successful login and handle redirection
    const successfulLogin = await simulateAuthentication();

    // Check if authentication was successful
    if (successfulLogin) {
      handleClose(); // Close the modal
      window.location.href = '/'; // Redirect to the home page
    } else {
      // Handle failed authentication
      // Show an error message or redirect to a login page
      alert('Login failed. Please try again.');
    }
  };

  const simulateAuthentication = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true); // Simulate successful authentication
      }, 2000); // Simulate asynchronous delay
    });
  };

  return (
    <Modal show={isLoginModalOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{login ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          {!login && (
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            {login ? 'Login' : 'Register'}
          </Button>
        </Form>

        <p onClick={switchForm} style={{ cursor: 'pointer', color: '#007bff' }}>
          {login ? "Don't have an account? Register here." : 'Already have an account? Login here.'}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
