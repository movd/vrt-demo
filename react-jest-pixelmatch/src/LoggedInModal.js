import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LoggedInModal = ({ showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Thanks you</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span role="img" aria-label="Test Tube">
          🧪
        </span>{" "}
        Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh
        onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoggedInModal;
