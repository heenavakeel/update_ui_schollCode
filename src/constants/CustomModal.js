import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ show, title, content, onConfirm, onCancel }) => {

  return (
    <Modal show={show} centered>
      {/* <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="d-flex flex-column align-items-center">
        {content}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className={title === "Delete" ? "btn btn-danger" : "btn btn-primary"} onClick={onConfirm}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
