import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, title, itemName, onConfirm, onCancel }) => {
  return (
    <Modal show={show} centered className="mt-10vh">
      {/* <Modal.Header> */}
        {/* <Modal.Title>{title}</Modal.Title> */}
        {/* <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button> */}
      {/* </Modal.Header> */}
      <Modal.Body className="d-flex flex-column align-items-center">
        <p className="text-center">{`Are you sure you want to delete ${itemName}?`}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};


export default DeleteModal;
