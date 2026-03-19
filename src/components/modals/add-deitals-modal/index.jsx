// components/checkout/AddDetailsModal.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import PaymentDetailsForm from "../../../page/user-profile/components/user-forms/user-payment";
import ChangeAddressForm from "../../../page/user-profile/components/user-forms/user-address";

const AddDetailsModal = ({ show, handleClose, type, onSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>{type === "address" ? "Add New Address" : "Add Payment Method"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "address" ? (
          <ChangeAddressForm onSuccess={onSuccess} />
        ) : (
          <PaymentDetailsForm onSuccess={onSuccess} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddDetailsModal;

