import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useOrderService from "../../../service/orderService";

const CANCEL_REASONS = [
  "Changed my mind",
  "Found a better price",
  "Shipping is too slow",
  "Incorrect order details",
  "Other",
];

const CancelModal = ({ show, onHide, id }) => {
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const { cancelOrder } = useOrderService();



  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Reason for cancellation:</Form.Label>
          <Form.Select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            {CANCEL_REASONS.map((reason, idx) => (
              <option key={idx} value={reason}>
                {reason}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={()=>cancelOrder(id, selectedReason, onHide)}>
          Confirm Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;
