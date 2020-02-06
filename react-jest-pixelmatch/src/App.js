import React, { useState } from "react";
import Login from "./Login";
import LoggedInModal from "./LoggedInModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLogin = event => {
    event.preventDefault();
    setLoggedIn(!loggedIn);
    handleShow();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Visual Regression Testing Test</h1>
          {loggedIn === false ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <div>
              <LoggedInModal showModal={showModal} handleClose={handleClose} />
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>
              <Button
                variant="primary"
                type="submit"
                onClick={() => setLoggedIn(!loggedIn)}
              >
                Log out!
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
