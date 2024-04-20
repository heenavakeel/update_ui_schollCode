import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoaderModal = ({ show, data }) => {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status"></Spinner>
          <span className="sr-only">Loading...</span>
      </Modal.Body>
    </Modal>
  );
};

export default LoaderModal;
