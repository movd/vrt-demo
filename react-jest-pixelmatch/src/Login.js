import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = ({ handleLogin }) => {
  return (
    <Form onSubmit={handleLogin} className="Login">
      <Form.Group controlId="formBasicEmail">
        <h2>Please Login</h2>
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log in!
      </Button>
    </Form>
  );
};

export default Login;
